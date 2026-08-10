# Mannarit Lomake (Vercel + Postgres)

Ilmoittautumislomake Kesän Mannarit -tapahtumaan. 
Rakennettu Next.js:llä (App Router) ja käyttää Vercel Postgres -tietokantaa. Tämä ratkaisu on ihanteellinen, kun haluat hostata sovelluksen ilmaiseksi Vercelissä ja kytkeä siihen oman alidomainin (esim. `mannarit.oma-domain.fi`).

## Käyttöönotto Vercelissä

1. Mene osoitteeseen [Vercel.com](https://vercel.com) ja kirjaudu sisään.
2. Paina **Add New...** -> **Project**.
3. Valitse tämä GitHub-repositorio (`mannarit-lomake`) ja paina **Import**.
4. Jätä asetukset oletuksiksi ja paina **Deploy**. (Ensimmäinen deploy menee läpi, mutta tietokantaa ei ole vielä kytketty, joten sovellus antaa virheen ilmoittautuessa).
5. Siirry projektin Dashboardiin ja valitse ylävalikosta **Storage**.
6. Paina **Create Database** -> valitse **Postgres** -> hyväksy ehdot (Region: esim. Frankfurt).
7. Kun tietokanta on luotu, liitä se tähän projektiin (Vercel kysyy lupaa). Tämä lisää automaattisesti tarvittavat `POSTGRES_*` ympäristömuuttujat projektillesi.
8. Mene projektin **Deployments**-välilehdelle, paina kolmea pistettä uusimman (tai aiemman) deployn kohdalla ja valitse **Redeploy**.
9. Valmista! Kun sovellus käynnistyy ja ensimmäinen henkilö ilmoittautuu, tietokantaan luodaan automaattisesti tarvittava `registrations`-taulu.

## Oman Domainin kytkeminen
Vercelin asetuksista (**Settings** -> **Domains**) voit helposti lisätä oman verkkotunnuksesi tai alidomainin. Vercel näyttää tarvittavat DNS-tietueet (esim. CNAME tai A-tietue), jotka sinun pitää lisätä domainisi hallintapaneelissa (esim. Louhi, Zoner, Namecheap). Vercel hoitaa HTTPS-sertifikaatin ilmaiseksi ja automaattisesti.

## Ominaisuudet
- **Lomake:** `/`
- **Admin-näkymä:** `/view`
