//student project SS2024 

/*In this part, the calculations and conversions for e.g. average value 
or ranking are carried out (time and difficulty metrics)
*/



export function generateDataSeries(processingTimes) {
  //This function takes a series of times and groups them, groups can be customized as required (currently 30,60,90,90+)

  // Counter for values below 30 and above 30
  let under30Count = 0;
  let over30Count = 0;
  let over60Count = 0;
  let over90Count = 0;

  // Iterate through the array and count
    processingTimes.forEach(time => {
    if (time < 30) {
      under30Count++;
    } else if (time >= 30 && time <= 60) {
      over30Count++;
    } else if (time >= 60 && time <= 90) {
      over60Count++;
    } else {
      over90Count++;
    }
  });

  // Create data series
    const dataSeries = [
    {
      data: [under30Count, over30Count,over60Count,over90Count]
    }
  ];
  return dataSeries;
}

export function generateDif_Series(dif_data) {
  /*This function takes a series of difficulty values and groups them; 
  groups can be customized as required (1 = very easy, 2 = easy, 3 = medium, 4 = hard, 5 = very hard)*/

  //Counters for difficulties
  let veryeasy = 0;
  let easy = 0;
  let medium = 0;
  let hard = 0;
  let veryhard = 0;
  let noanswer = 0;
  let avgdif = 0;
  let resultavgdif = 0;

  // Iterate through array and count
  dif_data.forEach(dif => {
    if (dif == "Very easy") {
      veryeasy++;
      avgdif = avgdif + 1;
    } else if (dif == "Easy") {
      easy++;
      avgdif = avgdif + 2;
    } else if (dif == "Normal") {
      medium++;
      avgdif = avgdif + 3;
    } else if (dif == "Difficult") {
      hard++;
      avgdif = avgdif + 4;
    } else if (dif == "Very difficult") {
      veryhard++;
      avgdif = avgdif + 5;
    } else {
      noanswer++;
      avgdif = avgdif + 0;
    }
  });

  resultavgdif = (avgdif)/(veryeasy+easy+medium+hard+veryhard+noanswer) //Calculation for avg dif
  resultavgdif = resultavgdif.toFixed(1); // Rounds

  // Creates Data Series
  const dataSeries = [
    {
      data: [veryeasy, easy,medium,hard,veryhard]
    }
  ];
  return { dataSeries: dataSeries, resultavgdif: resultavgdif };
}

export function get_dif_ranking(dif) {
//Takes a dif level (1 to 5) and return the dif level as string e.g. 2.3 = "easy"

  let ranking = "";
{
    if (dif < 1.5) { //Thresholds can be changed here
      ranking = "Very Easy" 
    } else if (dif < 2.5) {
      ranking = "Easy"
    } else if (dif < 3.5) {
      ranking = "Medium"
    } else if (dif < 4.5) {
      ranking = "Difficult"
    } else {
      ranking = "Very Difficult"
    }
  };
  return ranking;
}

export function get_rank(your_time,all_users_time,your_dif,all_users_dif) {
  //Calculates a rank for user perfomances by taking user information and all-user informations

  let timerank = your_time/all_users_time;
  let your_dif_int = 0;
  let ranking = "";

  //This part converses the difficult string to an int 
  if (your_dif == "Very Easy") {
    your_dif_int = 1
  } else if (your_dif == "Easy") {
    your_dif_int = 2
  } else if (your_dif == "Normal") {
    your_dif_int = 3
  } else if (your_dif == "Difficult") {
    your_dif_int =  4
  } else if (your_dif == "Very Difficult"){
    your_dif_int = 5
  } else {

  }

  //Calculates the ratio of your performance vs. all users performances
  let difrank = your_dif_int/all_users_dif
  let gradrank = difrank + timerank
  if (gradrank < 1) {
    ranking = "A"
  } else if (gradrank < 2) { //Threshold for the ranks can be changed here
    ranking = "B"
  } else if (gradrank < 3) {
    ranking = "C"
  } else if (gradrank < 4) {
    ranking = "D"
  } else {
    ranking = "F"
  }
  return ranking;
}