"use client"

import { useTranslations } from "next-intl"
import { useLocale } from "next-intl"
import Link from "next/link"
import React from "react"
import CookieConsent from "react-cookie-consent"

const CookieConsentBanner = () => {
  const t = useTranslations("home")
  const locale = useLocale()
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept All"
      declineButtonText="Decline"
      enableDeclineButton
      cookieName="yourAppCookieConsent"
      style={{
        background: "linear-gradient(135deg, #1c1c1c 0%, #2a2a2a 100%)",
        color: "#ffffff",
        fontSize: "16px",
        padding: "24px 0",
        borderRadius: 0,
        boxShadow:
          "0 -8px 40px 0 rgba(28, 28, 28, 0.4), 0 4px 32px 0 rgba(210, 180, 140, 0.1)",
        width: "100%",
        left: 0,
        right: 0,
        bottom: 0,
        position: "fixed",
        zIndex: 9999,
        borderTop: "2px solid #D2B48C",
        backdropFilter: "blur(10px)",
        paddingLeft: "16px",
        paddingRight: "16px",
      }}
      buttonStyle={{
        background: "linear-gradient(135deg, #D2B48C 0%, #C5A572 100%)",
        color: "#1c1c1c",
        fontSize: "14px",
        fontWeight: 600,
        padding: "12px 28px",
        borderRadius: "25px",
        border: "2px solid #D2B48C",
        marginLeft: "16px",
        boxShadow: "0 4px 16px 0 rgba(210, 180, 140, 0.3)",
        transition: "all 0.3s ease",
        cursor: "pointer",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
      }}
      declineButtonStyle={{
        background: "transparent",
        color: "#D2B48C",
        fontSize: "14px",
        padding: "12px 24px",
        borderRadius: "25px",
        border: "2px solid #D2B48C",
        marginLeft: "12px",
        fontWeight: 500,
        boxShadow: "none",
        transition: "all 0.3s ease",
        cursor: "pointer",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
      }}
      expires={30}
    >
      <div
        style={{
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div style={{ flex: "1", minWidth: "300px" }}>
          <div
            style={{
              lineHeight: 1.6,
              display: "block",
              marginBottom: 8,
              color: "#ffffff",
              fontWeight: 600,
              fontSize: "17px",
            }}
          >
            {t("CookieConsentText")}
          </div>
        </div>
      </div>
    </CookieConsent>
  )
}

export default CookieConsentBanner
