import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import React from "react"
import LocaleSwitcher from "../localeSwitcher/LocaleSwitcher"
import Logo from "./Logo"
import MenuButton from "./menu/MenuButton"

const Header = () => {
  const t = useTranslations("reservations")

  return (
    <header className="bg-[#1C1C1C]  fixed w-full top-0 z-50  shadow-2xl select-none   ">
      <div className="flex items-center justify-between h-[92px]  px-5 sm:px-10 md:px-[72px] mx-auto ">
        <Logo />
        <div className="flex items-center  md:gap-4 lg:gap-6 text-white  ">
          <div className="hidden md:block">
            <LocaleSwitcher />
          </div>
          <Button
            data-zc-action="open"
            className="rounded-none bg-[#D2B48C] hover:bg-[#D2B48C]/80 text-black h-8  md:h-[34px] w-24 md:w-28 mr-2 font-avenirRoman"
          >
            {t("Reservations")}
          </Button>
          <MenuButton />
        </div>
      </div>
    </header>
  )
}

export default Header
