"use client"

import { ReactNode, createContext, useEffect, useState } from "react";


export type ThemeContextProps = {
  isDark: boolean
  setIsDark: (theme: boolean) => void
}

export const ThemeContext = createContext<ThemeContextProps>({
  isDark: false,
  setIsDark(theme) {},
})


export default function ThemeContextProvider({children}: { children: ReactNode }): JSX.Element {
  const [isDarkValue, setIsDarkValue] = useState<boolean>(false)


  let setIsDark = (theme: boolean): void => {
    setIsDarkValue(theme)
    localStorage.theme = 'dark'
    document.documentElement.classList.add('dark')
  }

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches))
      setIsDark(true)
    else 
    setIsDark(false)
  }, [])

  return <ThemeContext.Provider value={{isDark: isDarkValue, setIsDark: setIsDark}}>
    {children}
  </ThemeContext.Provider>
}