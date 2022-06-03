import MainHeader from "../components/MainHeader"
import Banner from "../components/Banner"
import Categories from "../components/Categories"
import Products from "../components/Products"

export default function Home() {
    return (
        <>
            <MainHeader />
            <Banner />
            <Categories />
            <Products />
            {/* 
            <MainFooter /> 
            */}
        </>
    )
}
