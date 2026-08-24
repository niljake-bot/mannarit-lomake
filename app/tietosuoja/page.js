import '../globals.css';

export default function Tietosuoja() {
  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h1 style={styles.h1}>Tietosuojaseloste (GDPR)</h1>
        
        <div style={styles.content}>
          <h2>1. Rekisterinpitäjä</h2>
          <p>Kesän Mannarit -tapahtuman järjestäjätoimikunta.</p>
          
          <h2>2. Yhteyshenkilö rekisteriä koskevissa asioissa</h2>
          <p>Tapahtuman järjestäjä. Yhteydenotot tapahtuman Telegram-ryhmän tai suorien yhteystietojen kautta.</p>
          
          <h2>3. Rekisterin nimi</h2>
          <p>Kesän Mannarit 2026 -tapahtuman ilmoittautumisrekisteri.</p>
          
          <h2>4. Henkilötietojen käsittelyn tarkoitus ja oikeusperuste</h2>
          <p>Henkilötietoja (nimi ja vapaamuotoiset terveiset) käsitellään tapahtumaan ilmoittautumisen hallinnointia ja osallistujamäärän arviointia varten. Käsittelyn oikeusperuste on rekisteröidyn suostumus, jonka hän antaa lähettämällä lomakkeen.</p>
          
          <h2>5. Rekisterin tietosisältö</h2>
          <p>Rekisteriin tallennetaan seuraavat tiedot:<br />- Osallistujan antama nimi / nimimerkki<br />- Vapaamuotoiset terveiset<br />- Ilmoittautumisen aikaleima</p>
          
          <h2>6. Säännönmukaiset tietolähteet</h2>
          <p>Tiedot saadaan säännönmukaisesti rekisteröidyltä itseltään verkkolomakkeen kautta.</p>
          
          <h2>7. Tietojen luovutukset ja siirto EU:n tai ETA:n ulkopuolelle</h2>
          <p>Tietoja ei luovuteta säännönmukaisesti muille tahoille. Sovelluksen ja tietokannan ylläpitoon käytetään Vercel-palvelua, jonka palvelimet saattavat sijaita EU/ETA-alueella (esim. Saksa). Tietoja ei siirretä EU/ETA-alueen ulkopuolelle ilman asianmukaisia suojatoimia.</p>
          
          <h2>8. Tietojen säilytysaika</h2>
          <p>Tietoja säilytetään vain niin kauan kuin se on tarpeen tapahtuman järjestämiseksi. Tiedot poistetaan pysyvästi kohtuullisen ajan kuluessa tapahtuman päättymisen jälkeen (syksyllä 2026).</p>
          
          <h2>9. Rekisterin suojauksen periaatteet</h2>
          <p>Tietokanta on suojattu asianmukaisin teknisin toimenpitein. Pääsy tietoihin on rajattu vain tapahtuman järjestäjille (Admin-näkymä), joka on suojattu salasanalla tai muulla todennuksella.</p>
          
          <h2>10. Tarkastus-, korjaus- ja poisto-oikeus</h2>
          <p>Rekisteröidyllä on oikeus tarkastaa häntä koskevat tiedot, vaatia virheellisen tiedon korjaamista tai pyytää tietojensa poistamista. Nämä pyynnöt tulee osoittaa tapahtuman järjestäjälle.</p>
        </div>

        <a href="/" style={styles.backButton}>« Takaisin etusivulle</a>
      </div>
    </div>
  );
}

const styles = {
  wrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px' },
  container: { background: '#fff', padding: '30px 40px', borderRadius: '12px', boxShadow: '0 8px 16px rgba(0,0,0,0.1)', width: '100%', maxWidth: '700px' },
  h1: { color: '#1a1a1a', fontSize: '24px', marginBottom: '20px', marginTop: 0, textAlign: 'center' },
  content: { color: '#333', fontSize: '14px', lineHeight: '1.6' },
  backButton: { display: 'inline-block', marginTop: '25px', color: '#0066cc', textDecoration: 'none', fontWeight: 'bold' }
};
