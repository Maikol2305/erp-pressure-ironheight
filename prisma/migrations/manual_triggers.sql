-- Trigger para Alerta de Stock Bajo
-- Se ejecuta después de cada actualización en la tabla Product

CREATE OR REPLACE FUNCTION notify_low_stock()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.quantity <= NEW."stockMinimo" THEN
        INSERT INTO "Alert" (id, message, "productId", resolved, "createdAt", "updatedAt")
        VALUES (
            gen_random_uuid()::text,
            'El producto ' || NEW.name || ' (' || NEW.sku || ') tiene stock bajo: ' || NEW.quantity,
            NEW.id,
            false,
            NOW(),
            NOW()
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_check_low_stock
AFTER UPDATE OF quantity ON "Product"
FOR EACH ROW
EXECUTE FUNCTION notify_low_stock();

-- Procedimiento Almacenado para Reporte de Ganancias
-- Calcula ventas totales y costos totales en un rango de fechas

CREATE OR REPLACE FUNCTION get_profit_report(start_date TIMESTAMP, end_date TIMESTAMP)
RETURNS TABLE(total_sales FLOAT, total_cost FLOAT, net_profit FLOAT) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COALESCE(SUM(s.total), 0)::FLOAT as total_sales,
        COALESCE(SUM((items_cost.cost)::FLOAT), 0)::FLOAT as total_cost,
        (COALESCE(SUM(s.total), 0) - COALESCE(SUM((items_cost.cost)::FLOAT), 0))::FLOAT as net_profit
    FROM "Sale" s
    CROSS JOIN LATERAL (
        SELECT SUM((item->>'quantity')::FLOAT * (item->>'unitPrice')::FLOAT) as cost
        FROM jsonb_array_elements(s.items::jsonb) AS item
    ) AS items_cost
    WHERE s.date >= start_date AND s.date <= end_date;
END;
$$ LANGUAGE plpgsql;
