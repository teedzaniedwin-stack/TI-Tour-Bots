-- Triggers for Analytics

-- Function to update business analytics on activity
CREATE OR REPLACE FUNCTION update_business_analytics()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.activity_type = 'view' THEN
        UPDATE business_analytics 
        SET views = views + 1, updated_at = NOW()
        WHERE business_id = NEW.business_id;
    ELSIF NEW.activity_type = 'contact' THEN
        UPDATE business_analytics 
        SET contacts = contacts + 1, updated_at = NOW()
        WHERE business_id = NEW.business_id;
    ELSIF NEW.activity_type = 'bookmark' THEN
        UPDATE business_analytics 
        SET bookmarks = bookmarks + 1, updated_at = NOW()
        WHERE business_id = NEW.business_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_analytics
AFTER INSERT ON tourist_activity
FOR EACH ROW
EXECUTE FUNCTION update_business_analytics();

-- Function to update average rating on review
CREATE OR REPLACE FUNCTION update_avg_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE business_analytics
    SET 
        avg_rating = (SELECT AVG(rating) FROM reviews WHERE business_id = NEW.business_id),
        review_count = (SELECT COUNT(*) FROM reviews WHERE business_id = NEW.business_id),
        updated_at = NOW()
    WHERE business_id = NEW.business_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_rating
AFTER INSERT OR UPDATE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_avg_rating();
