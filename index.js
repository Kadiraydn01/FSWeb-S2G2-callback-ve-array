const { fifaData } = require("./fifa.js");

/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */
const worldCup2014 = fifaData.filter((maclar) => maclar.Year === 2014);
let finalMatch = worldCup2014.find((maclar) => maclar.Stage === "Final");

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
const Evsahibi = finalMatch["Home Team Name"];
console.log(Evsahibi);
//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
const Deplasman = finalMatch["Away Team Name"];
console.log(Deplasman);
//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
const Evsahibigolu = finalMatch["Home Team Goals"];
console.log(Evsahibigolu);
//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
const Deplasmangolu = finalMatch["Away Team Goals"];
console.log(Deplasmangolu);
//(e) 2014 Dünya kupası finali kazananı
let winner;
if (Evsahibigolu > Deplasmangolu) {
  winner = finalMatch["Home Team Name"];
} else {
  winner = finalMatch["Away Team Name"];
}
console.log("2014 Dünya Kupası Kazananı:", winner);

/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(fifaData) {
  const finalMatches = fifaData.filter((match) => match.Stage === "Final");
  return finalMatches;
}
const finalMatches = Finaller(fifaData);
console.log(finalMatches);
/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(fifaData, Finaller) {
  const finalMatches = Finaller(fifaData);

  const years = finalMatches.map((match) => match.Year);

  return years;
}

const finalYears = Yillar(fifaData, Finaller);

console.log(finalYears);

/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */

function Kazananlar(fifaData, Finaller) {
  const finalMatches = Finaller(fifaData);
  const kazananlar = finalMatches
    .map((match) => {
      if (match["Home Team Goals"] > match["Away Team Goals"]) {
        return match["Home Team Name"];
      } else if (match["Home Team Goals"] < match["Away Team Goals"]) {
        return match["Away Team Name"];
      } else {
        return "";
      }
    })
    .filter((winner) => winner !== "");

  return kazananlar;
}
const winners = Kazananlar(fifaData, Finaller);

console.log(winners);

/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar) {
  const finalMaclari = Finaller(fifaData);
  const finalYillari = Yillar(fifaData, Finaller);
  const kazanan1 = Kazananlar(fifaData, Finaller);
  const sonuc = finalYillari.map((yil, index) => {
    const ulke = kazanan1[index];
    return `${yil} yılında, ${ulke} dünya kupasını kazandı!`;
  });
  return sonuc;
}
const sonuc = YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar);
console.log(sonuc);
/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/
function OrtalamaGolSayisi(callback) {
  const matches = callback(fifaData);
  const totalHomeGoals = matches.reduce(
    (total, match) => total + match["Home Team Goals"],
    0
  );
  const totalAwayGoals = matches.reduce(
    (total, match) => total + match["Away Team Goals"],
    0
  );
  const totalGoals = totalHomeGoals + totalAwayGoals;
  const averageGoals = totalGoals / matches.length;
  const roundedAverage = Math.round(averageGoals * 100) / 100;
  return roundedAverage;
}
const averageGoals = OrtalamaGolSayisi(Finaller);
console.log(averageGoals);
/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(/* kodlar buraya */) {
  /* kodlar buraya */
}

/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(/* kodlar buraya */) {
  /* kodlar buraya */
}

/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(/* kodlar buraya */) {
  /* kodlar buraya */
}

/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */

/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa() {
  console.log("Kodlar çalışıyor");
  return "as";
}
sa();
module.exports = {
  sa,
  Finaller,
  Yillar,
  Kazananlar,
  YillaraGoreKazananlar,
  OrtalamaGolSayisi,
};
