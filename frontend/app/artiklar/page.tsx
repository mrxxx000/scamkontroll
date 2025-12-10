'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const articles = [
  {
    title: "10 tips för att undvika bluffnummer",
    category: "Guide",
    // content shown when opening the article on top of the page
    content: [
      "1. Lägg på direkt om du inte känner igen numret — om någon okänd ringer och du är osäker, lägg genast på. Seriösa företag eller myndigheter ringer sällan oväntat.",
      "2. Logga aldrig in med BankID eller lämna ut koder/mobilnummer på uppmaning av någon som ringer. Banker, myndigheter eller företag begär aldrig att du ska logga in på det sättet via ett telefonsamtal.",
      "3. Lita aldrig på samtalaren även om de har personlig information om dig. Oberoende av hur trovärdig personen verkar, kan bedragare lura med information de fått från andra håll.",
      "4. Ring själv upp företaget eller myndigheten via ett nummer du vet är äkta — om någon påstår sig ringa från t.ex. banken, skatteverket eller ett leveransföretag: lägg på och ring ett officiellt nummer från företagets/myndighetens hemsida.",
      "5. Klicka aldrig på länkar i SMS eller e‑post från oväntade nummer — många bluffar startar med ett SMS eller mejl som ser seriöst ut men leder till falska sidor.",
      "6. Var misstänksam om samtalet försöker skapa stress eller panik — bedragare använder ofta stress eller skrämsel för att få dig att agera snabbt utan eftertanke.",
      "7. Prata med nära och kära, särskilt äldre, om att bluffnummer finns. Många drabbas för att de inte vet vad de ska göra när någon ringer. Dela gärna informationen vidare.",
      "8. Om du tvekar — avsluta och ring banken/myndigheten själv för att kontrollera noggrant. Ta tid på dig att tänka. Seriösa företag accepterar det.",
      "9. Använd spärrar, blockeringar eller appar för att filtrera spam och bluff‑samtal. Många operatörer erbjuder nummerspärrar vilket kan minska risken för att bli uppringd av bluffnummer.",
      "10. Rapportera misstänkta bluffnummer eller samtal till din bank eller polisen direkt — det hjälper att stoppa bedragarna och varna andra."
    ]
  },
  {
    title: "Hur återställer du ditt BankID efter ett bedrägeriforsök?",
    category: "Guide",
    
    // content shown when opening the article on top of the page
    content: [
      "1. Spärra BankID direkt\n\nOm du misstänker att ditt BankID har blivit utsatt för bedrägeri, kontakta din bank omedelbart och be dem spärra det. Detta gäller både Mobilt BankID och BankID med kort/tangentkod.",
      "2. Kontakta banken via officiella kanaler\n\nRing aldrig tillbaka till numret som kontaktade dig, använd alltid bankens officiella telefonnummer eller hemsida. Banken kan hjälpa dig återställa BankID och säkra konton.",
      "3. Kontrollera konton och transaktioner\n\nGranska dina bankkonton och kort noggrant för obehöriga transaktioner. Rapportera misstänkta aktiviteter till banken direkt.",
      "4. Gör en polisanmälan\n\nOm du blivit utsatt för bedrägeri eller försökt bedrägeri med BankID, gör alltid en polisanmälan. Det hjälper både dig och andra.",
      "5. Var vaksam framöver\n\nAnvänd BankID endast när du själv initierar det. Godkänn aldrig inloggningar, betalningar eller signeringar via telefon, SMS eller mejl från okända."
    ]
  },
  {
    title: "PostNord bluff: Så skyddar du dig",
    category: "Bedrageri",
    content: [
      "Allt du behöver veta om de falska PostNord-SMS som cirkulerar i Sverige och försöker lura dig att betala avgifter eller lämna ut information.",
      "Vad är PostNord-bluffen?\n\nBedragare skickar falska SMS som påstår att ett paket är försenat eller att du måste betala en avgift/tull. Länkarna leder till falska betalningssidor där bedragare försöker stjäla dina uppgifter eller pengar.",
      "Så känner du igen bluffen",
      "• SMS med okänt avsändarnummer som påstår att ditt paket är på väg",
       "• Krav på “tullavgift” eller betalning via länk\n• Länkar som leder till falska webbplatser som inte är PostNords officiella",
       "• Stress eller brådskande meddelanden som försöker få dig att agera snabbt",
      "Så skyddar du dig",
      "• Klicka aldrig på länkar i SMS från okända avsändare",
      "• Logga aldrig in med BankID eller lämna kortuppgifter via länkar i SMS",
      "• Kontrollera alltid paketstatus på PostNords officiella webbplats",
      "• Radera misstänkta SMS och lägg på om någon ringer",
      "• Rapportera bluffen till PostNord och polisen om du utsätts",
      "Tips: Om du vill kontrollera ett nummer som ringt eller skickat SMS, använd vårt sökfält högst upp på sidan."
    ]
  },
  {
    title: "Vad gör du om du blir bluffad?",
    category: "Råd",
    content: [
      "Handlingsplan för dig som redan har blivit utsatt för en bluff eller ett bedrägeri",
      "1. Stoppa allt – agera direkt\n\nSluta klicka, logga in eller prata med bedragaren. Stäng ned SMS, e-post, webbsidan eller telefonsamtalet.",
      "2. Spärra BankID och kort om något kan ha blivit röjt\n\nOm du på något sätt lämnat ut:\n\nBankID-kod,\nBankuppgifter, \nKortnummer\n eller Loggat in på länk från SMS\n\n→ Ring din bank direkt och spärra BankID och/eller kort.",
      "3. Byt lösenord och säkra dina konton",
      "Om du skrivit in information på en misstänkt sida, byt:",
      "Lösenord till e-post.",
      "Lösenord till banken.",
      "Lösenord till sociala medier.",
      "Alla lösenord som kan vara kopplade till bluffen.",
      "4. Kontrollera om pengar flyttats\n\nLogga in på banken (via officiell väg) och kontrollera kontoutdrag:",
      "Okända överföringar?",
      "Oklara kortbetalningar?",
      "Nya mottagare i banklistan?",
      "Rapportera omedelbart till banken om något ser fel ut.",
      "5. Gör en polisanmälan\n\nPolisen rekommenderar ALLTID att du anmäler bedrägeri eller försök till bedrägeri.",
       "Det hjälper utredningen och skyddar andra.",
      "6. Spara bevis",
      "Spara: SMS, länkar, telefonnummer, skärmbilder, e-post och transaktionsuppgifter. Det hjälper både polisen och banken.",
      "7. Informera närstående – särskilt äldre\n\nBerätta snabbt för familj eller vänner, så ingen annan luras på samma sätt. Bedragare ringer ofta flera personer i samma familj eller område.",
      "8. Lär dig känna igen bluffen för framtiden\n\nLäs våra guider om:", 
      "PostNord-bluff", 
      "BankID-bedrägerier", 
      "Telefonbedrägerier", 
      "Phishing/nätfiske", 
      "Det gör att du är tryggare nästa gång."
    ]
  },
  {
    title: "Kryptobedrägerier ökar - var försiktig",
    category: "Varning",
    content: [
      "Så skyddar du dig mot kryptobedrägerier",
      "Här är konkreta råd du kan följa om du överväger krypto-investering eller bara vill vara säker:",
      "• Var skeptisk mot “för bra för att vara sant”-löften. Höga, garanterade vinster är en vanlig varningssignal. Seriösa investeringar kräver tid och förutsätter risk.",
      "• Verifiera källan noggrant. Använd bara välkända och etablerade kryptobörser eller plånböcker. Kontrollera att webbadress, ägare och användarvillkor stämmer och undvik kopior och fejk-sajter.",
      "• Klicka aldrig på länkar via mejl, sociala medier eller meddelanden från okända. Många bluffar börjar med phishing-sidor som försöker stjäla inloggningsuppgifter eller privata nycklar.",
      "• Lämna aldrig ut din “private key” eller seed phrase. Det är nyckeln till din kryptoplånbok och dela den aldrig med någon, inte ens med “support” som påstår att de hjälper dig.",
      "• Om du investerar, använd 2FA och säkra lösenord. Tvåfaktorsautentisering, helst via app (inte SMS), ökar säkerheten och spär på skyddet om någonting går fel.",
      "• Var extra försiktig med erbjudanden på sociala medier eller via okända kontakter. Många kryptobedrägerier börjar med kontakt på t.ex. Facebook, YouTube eller i grupper — ofta med falska löften om stora vinster.",
      "• Om något känns fel, gå ur eller vänta. Ta dig tid att tänka igenom investeringen. Seriösa plattformar kräver inte att du “bestämmer dig nu.”",
      "Rekommenderad call-to-action för din sida",
      "Tänk dig för innan du investerar i kryptovaluta och använd sunda metoder för att skydda dig. Om du någonsin känner dig tveksam: backa — och kolla gärna fler guider och råd här på sajten."
    ]
  },
  {
    title: "Så verifierar du ett telefonnummer",
    description: "Enkla steg för att kontrollera om ett nummer är en känd bluff.",
    readTime: "3 min",
    date: "4 dec 2025",
    category: "Guide"
  }
];

export default function Artiklar() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex !== null) {
      // scroll to top of content so the opened article appears at top
      const mainEl = document.querySelector('main');
      if (mainEl) {
        mainEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [activeIndex]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Artiklar & Guider</h1>
          <p className="text-gray-600 mb-8">Lär dig skydda dig mot bluff och bedrägerier</p>

          {/* Expanded article (shown at top when clicked) */}
          {activeIndex !== null && (
            <article className="mb-8 p-6 border rounded-lg bg-white shadow-md">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{articles[activeIndex].category}</span>
                <button onClick={() => setActiveIndex(null)} className="text-sm text-gray-500 hover:underline">Stäng</button>
              </div>
              <h2 className="text-2xl font-bold mb-4">{articles[activeIndex].title}</h2>
              <div className="prose max-w-none text-gray-700">
                {articles[activeIndex].content?.map((p: string, i: number) => {
                  const blocks = p.split(/\n\n/).filter(Boolean);
                  return blocks.map((block, bi) => {
                    const key = `${i}-${bi}`;

                    // If block contains bullet markers, render as list
                    if (block.includes('•')) {
                      const lines = block
                        .split(/\n/)
                        .map((l) => l.replace(/^•\s?/, '').trim())
                        .filter(Boolean);
                      return (
                        <ul key={key} className="list-disc ml-6 space-y-1">
                          {lines.map((ln, idx) => (
                            <li key={idx}>{ln}</li>
                          ))}
                        </ul>
                      );
                    }

                    // Heuristic: short heading-like blocks -> render bold
                    const isHeading = /^(Vad är|Så |Tips:|1\.|2\.|3\.|4\.|5\.|6\.|7\.|8\.)/.test(block) && block.length < 120 && !block.includes('\n');
                    if (isHeading) {
                      return (
                        <p key={key}>
                          <strong>{block}</strong>
                        </p>
                      );
                    }

                    // Default: paragraph
                    return (
                      <p key={key}>
                        {block}
                      </p>
                    );
                  });
                })}
              </div>
            </article>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <article
                key={article.title}
                onClick={() => {
                  // open the article at top of page
                  setActiveIndex(index);
                }}
                className="p-6 border rounded-lg bg-white hover:shadow-lg transition cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{article.category}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                {/* Show a single-tip preview when article has content and is not opened yet */}
                {article.content ? (
                  <p className="text-gray-600 text-sm mb-4">{article.content[0]}</p>
                ) : (
                  article.description && <p className="text-gray-600 text-sm mb-4">{article.description}</p>
                )}
                <div className="flex items-center justify-between text-xs text-gray-500">
                    <div>
                      {/* show readTime only when article is not opened */}
                      {activeIndex === index ? null : article.readTime}
                    </div>
                  <span>{article.date}</span>
                </div>

                {/* Läs mer button shown when article is not expanded */}
                {activeIndex !== index && (
                  <div className="mt-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveIndex(index);
                      }}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Läs mer
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
