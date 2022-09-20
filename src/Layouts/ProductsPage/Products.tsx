import Catalog from "../../components/Catalog/Catalog"
import Header from "../../components/Header/Header"
import '../../App.scss'

const Products: React.FC = () => {
    return (
        <div className="container">
            <Header/>
            <Catalog/>
        </div>
    )
}

export default Products