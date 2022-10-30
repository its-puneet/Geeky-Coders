from countryinfo import CountryInfo
count=input("Enter your country name: ")
country = CountryInfo(count)
print("Capital is : ", country.capital())
print("Currencies is :", country.currencies())
print("Language is : ", country.language())
print("Borders are : ", country.borders())
print("Others names : ", country.alt_spellings())
