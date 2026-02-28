 import type ListingItem from "../types";
 import noImage from '../assets/no-image.png';


const ListingCard = ({ item }: {item: ListingItem}) => {
    const title = item.title.length > 50 ? 
    item.title.slice(0, 47) + "..." :
    item.title;

    const formatPrice = (): string => {
        const numPrice = parseFloat(item.price);
        const numPriceFormat = isNaN(numPrice) ? item.price : numPrice.toFixed(2);
        const code = item.currency_code.trim().toUpperCase();

        switch(code) {
            case "USD":
                return `$${numPriceFormat}`;
            case "EUR":
                return `€${numPriceFormat}`; 
            case "GBR":
                return `£${numPriceFormat}`;
            default:
                return `${code} ${numPriceFormat}`;
        }
    }

    const stockClass = (): string => {
        const quantity = item.quantity;
        if (quantity <= 10) return "stock-low";
        if (quantity <= 20) return "stock-medium";
        return "stock-high";
    }

    const imgUrl = item.MainImage?.url_570xN || noImage ;

    return (
        <div className="product-card">
            <img src={imgUrl} alt={title} className="product-image" />
            <div className="product-info">
                <h3 className="product-title">{title}</h3>
                <div className="price-container">{formatPrice()}
                    <span className={`stock-badge ${stockClass()}`}>
                        {item.quantity} left</span>
                </div>
            </div>
        </div>
    );
};

export default ListingCard;
