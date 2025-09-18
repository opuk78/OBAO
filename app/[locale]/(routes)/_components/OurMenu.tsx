"use client"
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { useTranslations } from "next-intl"
import Image from "next/image"
import React, { useEffect, useState } from "react"

const OurMenuComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const animates = [
    "OurMenuAuthentic",
    "OurMenuTraditional",
    "OurMenuExquisite",
    "OurMenuDelightful",
  ]

  const t = useTranslations("home")

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % animates.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="pt-10 lg:pb-0 w-full mx-auto relative lg:pt-20 flex flex-col justify-center items-center">
      <div className="lg:block hidden">
        <Image
          src="/miniPhotos/ourmenuleftimg.svg"
          alt="hero"
          width={80}
          height={80}
          className="absolute lg:top-16 left-0"
        />
        <Image
          src="/miniPhotos/ourmenurightimg.svg"
          alt="hero"
          width={80}
          height={80}
          className="absolute bottom-5 right-0"
        />
      </div>
      <div className="text-center w-4/5">
        <h1 className="text-[#FB4444] text-3xl md:text-4xl font-bold font-avenirMedium4 text-center">
          {t("OurMenu")}
        </h1>

        <p className="text-white  text-xl md:text-2xl my-8 leading-7 font-avenirRoman3">
          {t("OurMenuTextDiscover")}
          <span className="text-[#FB4444] w-[130px]  lg:w-[140px] ml-1 inline-block relative lg:top-[6px] top-2 h-[28px] overflow-hidden ">
            <AnimatePresence mode="wait">
              <motion.span
                key={animates[currentIndex]}
                initial={{ y: "100%", opacity: 1 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute left-0 top-0 h-full w-full flex justify-center items-start "
              >
                {t(animates[currentIndex])}
              </motion.span>
            </AnimatePresence>
          </span>
          {t("OurMenuTextFlavors")}
        </p>
        <div className="flex gap-4 justify-center gap-x-8">
          <Button
            size="sm"
            variant="outline"
            className="bg-transparent px-7 lg:px-4 text-lg md:text-sm border-[1px] border-[#D2B48C] text-[#D2B48C] rounded-none hover:bg-[#D2B48C] hover:text-black"
            onClick={() =>
              window.open("/schuman_menu.pdf", "_blank")
            }
          >
            {t("ViewOurMenu")}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OurMenuComponent
