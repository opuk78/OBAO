import { Separator } from "@/components/ui/separator"
import { useTranslations } from "next-intl"
import CookieConsentBanner from "../../../../components/common/CookieConsent"
import AboutUsComponent from "../_components/AboutUs"
import CarouselComponent from "../_components/Carousel"
import HeroComponent from "../_components/Hero"
import OurMenuComponent from "../_components/OurMenu"
import OurServices from "../_components/OurServices"
import RestaurantsSection from "../_components/Restaurants"
import CateringForm from "../catering/_components/CateringForm"

const Home = () => {
  const t = useTranslations("catering")
  return (
    <div className="w-full text-white mt-[94px] lg:mt-[90px]">
      <HeroComponent />
      <AboutUsComponent />
      <CarouselComponent />
      <OurServices />
      <OurMenuComponent />
      <RestaurantsSection />
      <Separator
        id="contact-us"
        className="bg-[#634927] w-full mb-0 lg:mb-10"
      />
      <div className="bg-[#1C1C1C] flex flex-col lg:flex-row  px-5 lg:px-[130px]  gap-10 pt-20">
        <div className="w-full lg:w-1/2 ">
          <p className="text-4xl text-center text-white md:text-start font-avenirHeavy5 mb-7">
            {t("GetIn")}{" "}
            <span className="text-[#FB4444] font-avenirHeavy5">
              {t("Touch")}{" "}
            </span>
          </p>
          <div className="text-base font-avenirBook2 text-justify lg:text-start text-white space-y-3">
            <p>{t("GetInTouchText1")}</p>
            <p>{t("GetInTouchText2")}</p>
            <p>
              {t("Email")}:{" "}
              <a
                href="mailto:yoacfood2@gmail.com"
                target="_blank"
                className="hover:text-[#DBC3A3] underline"
                rel="noreferrer"
              >
                yoacfood2@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 mb-5 lg:mb-16">
          <CateringForm />
        </div>
      </div>
      <CookieConsentBanner />
    </div>
  )
}

export default Home
