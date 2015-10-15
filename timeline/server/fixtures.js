
randomInt = (min, max) => { return Math.floor (Math.random() * (max - min)) + min }

Meteor.startup( () => {

   // Planes

   let planes = ["Andersson", "Andersson", "Andrade", "Andrews", "Antonov", "Barnes", "Bayerl", "Bettiolo", "Brew", "Brown", "Bruce", "Butler", "Buttler", "Cheesman", "Cliche", "Coates", "Cuny", "Cuny", "Cynk", "Darling", "Dyer", "Fahey", "Francillon", "Francillon", "Gaillard", "Gibbings", "Gordon", "Green", "Grosz", "Gugju", "Gunston", "Haddow", "Hardy", "Hartmann", "Hauet", "Horten", "Jackson", "James", "Jenkins", "Juptner", "Kay", "Kens", "King", "Komissarov", "Kotelnikov", "Lake", "Lewis", "Liron", "Lloyd", "Lumsden", "Mawhinney", "Mikesh", "Mondey", "MRAZEK", "Myhra", "Nemecek", "Nowarra", "Opdycke", "Ord-Hume", "Pelletier", "Piggott", "Shavrov", "Shenstone", "Shenstone", "Simons", "St. John Turner", "Stoff", "Tagg"];

   planes.forEach((plane) => {
      Planes.insert({ make: plane, order: randomInt(1, 100000) })
   });

   // Trains

   let trains =  ["Ald Teachers Sp", "Af Hw Spl", "Ami Pvr Special", "Adi Nagpur Spl", "Agc Pune Sf Sp", "Adi Pune Spl", "Anvt Pnbe Spl", "Anvt Koaa Sf Sp", "Asn Gkp Special", "Asn Apdj Specia", "Apdj Asn Specia", "Asn Pnbe Specia", "Asn Vskp Specia", "Asn Pnbe Spl", "Aii Dli Sf Spl", "Anvt Jat Spl", "Anvt Jat Spl", "Ald Uhp Spl", "Ald Ltt Spl", "Adi Bgkt Spl", "Awr Krh Spl", "Anvt Gkp Spl", "Andi Bju Spl", "Aii Bju Spl", "Aii Kyq Spl", "Apdj Aii Specia", "Aii Apdj Spl", "Apdj Dbb Specia", "Aii Hyb Spl", "Aii Ogl Mtm Spl", "Awb Tpty Spl", "Adb Pvr Spl", "Awb Qln Spl", "Ak Qln Spl", "Adb Qln Spl", "Anvt Src Spl", "Ald Vskp Spl", "Ahmedabad Sup S", "Adi Bct Sup Spl", "Adi Madgaon Spl", "Adi Lucknow Spl", "Adi Patna Spl", "Adi Patna Spl", "Adi Mao Ac Spl", "Ahmedabad Exp", "Aii Beas Spl", "Aii Sln Inag Sp", "Aii Jp Intercit", "Aii Jp Sf Spl", "Aii Hw Special", "Aii Jp Exp", "Aii Jp Special", "Ahmedabad Exp", "Amritsar Expres", "Asr Ltt Express", "Ahimsa Express", "Ahimsa Express", "Ambikapur Expre"];

   trains.forEach((train) => {
      Trains.insert({ make: train, order: randomInt(1, 100000) })
   });

   // Automobiles

   let models = ["Acura", "Ferrari", "Jaguar", "Mercedes-Benz", "Rolls-Royce", "Aston Martin", "Fiat", "Jeep", "Mercury", "Saab", "Audi", "Ford", "Kia", "Mini", "Saturn", "BMW", "Freightliner", "Lamborghini", "Mitsubishi", "Scion", "Bentley", "GMC", "Land Rover", "Nissan", "Smart", "Buick", "Honda", "Lexus", "Oldsmobile", "Subaru", "Cadillac", "Hummer", "Lincoln", "Plymouth", "Suzuki", "Chevrolet", "Hyundai", "Lotus", "Pontiac", "Toyota", "Chrysler", "Infiniti", "Maserati", "Porsche", "Volkswagen", "Dodge", "Isuzu", "Mazda", "Ram", "Volvo"];

   models.forEach((model) => {
      Automobiles.insert({ make: model, order: randomInt(1, 100000) })
   });

});
