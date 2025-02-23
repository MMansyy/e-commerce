import { Link } from 'react-router-dom';
import './BrandCard.css';
export default function BrandCard({ brand }) {
    return (
        <Link to={brand._id} className="card border-2 ">
            <img src={brand.image} alt={brand.name} />
            <div className="card__content ">
                <p className="card__title">{brand.name}</p>
            </div>
        </Link>

    )
}
