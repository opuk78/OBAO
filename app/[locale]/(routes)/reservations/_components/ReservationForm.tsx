"use client"

import { useAddReservationMutation } from "@/app/store/api/reservationsApi"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import type { ReservationFormData } from "@/constans/types"
import { useToast } from "@/hooks/use-toast"
import { reservationSchema } from "@/lib/schema"
import { getTimeOptionsByDate } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { format, parse } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import ContactForm from "./ContactForm"

const ReservationForm = () => {
  const t = useTranslations("reservations")
  const [date, setDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [adultCount, setAdultCount] = useState<number>(0)
  const [childCount, setChildCount] = useState<number>(0)
  const [isOpen, setIsOpen] = useState(false)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const [addReservation] = useAddReservationMutation()
  const [reservations, setReservations] = useState([])
  const { toast } = useToast()

  const methods = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      date: "",
      time: "",
      adults: 1,
      child: 0,
    },
  })

  const adultIncrement = () => {
    setAdultCount((prev) => {
      const newValue = prev + 1
      methods.setValue("adults", newValue)
      return newValue
    })
  }

  const adultDecrement = () => {
    setAdultCount((prev) => {
      const newValue = Math.max(prev - 1, 0)
      methods.setValue("adults", newValue)
      return newValue
    })
  }

  const childIncrement = () => {
    setChildCount((prev) => {
      const newValue = prev + 1
      methods.setValue("child", newValue)
      return newValue
    })
  }

  const childDecrement = () => {
    setChildCount((prev) => {
      const newValue = Math.max(prev - 1, 0)
      methods.setValue("child", newValue)
      return newValue
    })
  }

  useEffect(() => {
    fetch("/api/sheets")
      .then((res) => res.json())
      .then((data) => setReservations(data))
  }, [])

  useEffect(() => {
    if (date) {
      methods.setValue("date", format(date, "yyyy-MM-dd"))
    }
  }, [date])

  const onSubmit: SubmitHandler<ReservationFormData> = async (data) => {
    try {
      await addReservation({
        ...data,
        sheetName: "Reservations",
      })

      toast({
        description: (
          <div className="flex items-center justify-between rounded-none w-[300px] lg:w-auto bg-[#DBC3A3] ml-3 lg:ml-0 lg:pr-[2px] ">
            <div className="flex items-center ml-3 gap-2 py-2">
              <Image
                src="/icons/success.svg"
                alt="check"
                width={15}
                height={15}
              />
              <span className="text-black">{t("ReservationSuccess")}</span>
            </div>
            <button
              type="button"
              onClick={() => toast.dismiss()}
              className="text-black font-bold mr-3 text-sm lg:text-lg lg:ml-24 ml-5 lg:pl-5"
            >
              ✕
            </button>
          </div>
        ),
        className:
          "fixed bottom-4 left-1/2 transform -translate-x-1/2 w-auto max-w-md border p-0 rounded-none m-0 border-[#A68A5E] shadow-md",
        duration: 3000,
      })

      methods.reset()
      setAdultCount(0)
      setChildCount(0)
      setDate("")
      setSelectedTime("")
      setIsOpen(false)
    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  return (
    <div className=" border  border-[#D2B48C]  mb-10 lg:mb-0  lg:py-14  p-8 lg:px-14">
      <h3 className="text-3xl lg:text-2xl font-bold  text-center font-avenirHeavy5">
        {t("FindATable")}
      </h3>

      <div className="flex flex-col gap-4 lg:min-w-[350px]">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col space-y-7   my-6  w-full">
              adult

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-2">
                  <span>
                    {adultCount} {t("Adult")}{" "}
                  </span>
                  <div className="flex items-center gap-5 text-3xl">
                    <Button
                      type="button"
                      variant="ghost"
                      className="p-0 text-2xl transition-all  duration-300 hover:bg-transparent hover:text-white"
                      size="lg"
                      onClick={adultIncrement}
                    >
                      +
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      className="p-0 text-2xl transition-all duration-300 hover:bg-transparent hover:text-white"
                      size="lg"
                      onClick={adultDecrement}
                    >
                      -
                    </Button>
                  </div>
                </div>
                <Separator />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-2">
                  <span>
                    {childCount} {t("Child")}
                  </span>
                  <div className="flex items-center gap-5 text-3xl">
                    <Button
                      type="button"
                      variant="ghost"
                      className="p-0 text-2xl transition-all duration-300 hover:bg-transparent hover:text-white"
                      size="lg"
                      onClick={childIncrement}
                    >
                      +
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      className="p-0 text-2xl transition-all duration-300 hover:bg-transparent hover:text-white"
                      size="lg"
                      onClick={childDecrement}
                    >
                      -
                    </Button>
                  </div>
                </div>
                <Separator />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex flex-col items-start space-y-2">
                  <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="flex justify-between w-full p-0 text-[15px] text-white bg-transparent border-none hover:bg-transparent hover:text-white"
                      >
                        <span>
                          {date ? format(date, "d MMM yyy") : t("SelectDate")}
                        </span>
                        <span>
                          <CalendarIcon />
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[350px] p-0 rounded-none">
                      <Calendar
                        classNames={{
                          caption:
                            "flex justify-start pt-1 relative items-center",
                          nav_button_previous: "hidden",
                          nav_button_next:
                            "absolute right-1 text-[#BE935A] opacity-100",
                        }}
                        mode="single"
                        selected={date ? new Date(date) : undefined}
                        onSelect={(date) => {
                          if (date) {
                            const formatted = format(date, "yyyy-MM-dd")
                            setDate(formatted)
                            methods.setValue("date", formatted)
                            setIsPopoverOpen(false)
                          }
                        }}
                        initialFocus
                        fromDate={new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <Separator />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-2">
                  <Controller
                    name="time"
                    control={methods.control}
                    render={({ field }) => (
                      <Select
                        onValueChange={(value) => {
                          setSelectedTime(value)
                          field.onChange(value)
                        }}
                      >
                        <SelectTrigger className="flex justify-between items-center bg-transparent border-none outline-none ring-0 focus:ring-0 focus:ring-offset-0 gap-x-2 text-[15px] w-full p-0 ">
                          <span>{selectedTime || t("SelectTime")}</span>
                        </SelectTrigger>
                        <SelectContent className=" h-56 overflow-y-auto border border-[#D2B48C] rounded-none shadow-md w-full">
                          <SelectGroup>
                            {date &&
                              getTimeOptionsByDate(date).map((time) => {
                                const formattedSelectedDate = format(
                                  new Date(date),
                                  "yyyy-MM-dd",
                                )

                                const isSunday = new Date(date).getDay() === 0

                                const isReserved = reservations?.data?.some(
                                  (row) => {
                                    const rawDate = row[7]
                                    const parsedRowDate = format(
                                      parse(rawDate, "M/d/yyyy", new Date()),
                                      "yyyy-MM-dd",
                                    )

                                    return (
                                      parsedRowDate === formattedSelectedDate &&
                                      row[8] === time
                                    )
                                  },
                                )

                                const disabled = isReserved || isSunday

                                return (
                                  <SelectItem
                                    key={time}
                                    value={time}
                                    disabled={disabled}
                                    className="focus:bg-[#ECE0CF] focus:cursor-pointer disabled:bg-[#FBF8F4]"
                                  >
                                    <div className="flex justify-between w-80 -pl-1 pr-1">
                                      <span>{time}</span>
                                      <span>
                                        {disabled
                                          ? t("NotAvailable")
                                          : t("Available")}
                                      </span>
                                    </div>
                                  </SelectItem>
                                )
                              })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <Separator />
              </div>
            </div>
            <ContactForm
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              guests={adultCount + childCount}
              date={date}
              time={selectedTime}
            />
          </form>
        </FormProvider>

        {/* <Image
          src="/little-break.jpg"
          alt="Little Break"
          width={500}
          height={300}
          className="object-cover mt-4"
        /> */}
      </div>
    </div>
  )
}

export default ReservationForm
