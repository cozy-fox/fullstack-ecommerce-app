import MainHeader from "../components/MainHeader"
import Banner from "../components/Banner"
import Categories from "../components/Categories"
import Products from "../components/Products"
import MainFooter from "../components/MainFooter"

export default function Home() {
    return (
        <>
            <MainHeader />
            <Banner />
            <Categories />
            <Products />
            <MainFooter />
        </>
    )
}
