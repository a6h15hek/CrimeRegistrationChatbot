import chatBotResourceData from '../data/Resources.json';
import chatbotCrimeData from '../data/crimedata.json';
import $ from "jquery";
class ChatbotCore{
  //global variable follows
  initialPersonalData =null;
  chabotDialogue = chatBotResourceData.ChabotDialogue;
  
  chatbotState = "anonymousPersonGreeting";
  crimeIndex = null;
  
  currentQuestion = null;

  totalQuestions = null;
  //totalSubQuestion = null;
  currentQuestionNumber = 0;
  currentSubQuestionNumber = 0;
  selectedCrimeData = null;
  previousQuestion  = null;

  totalPersonalQuestion = chatBotResourceData.PesonalDetailQuestions.length;
  totalPersonalSubQuestion = null;
  currentPersonalQuestionNumber = 0;
  currentPersonalSubQuestionNumber = 0;
  isSubQuestionStateActive = false;
  subQuestionSet = null;
  
  //storing the data information of user
  CrimeReportData =null;

  constructor(typeOfRegistration){
    if(typeOfRegistration == "registered"){
      //storing the data information of user
      this.initialPersonalData = JSON.parse(sessionStorage.getItem("InitialPersonalDetails"));
      this.CrimeReportData = this.initialPersonalData;
      this.chatbotState = "greeting";
    }else if(typeOfRegistration == "anonymous"){
      this.chatbotState = "anonymousPersonGreeting";
      this.CrimeReportData = {
        name : "anonymous"
      }
    }
    /*console.log("chatbot core live");
    //testing remove stopword return array
    var testString = "i have 1 sim card"
    console.log(this.isResponseValid(this.getStringTokenizedToArray(testString),"text",null))
    //console.log(this.getRemoveStopWordArray(this.getStringTokenizedToArray(testString)))
    //console.log(this.crimeRecognizer(this.getRemoveStopWordArray(this.getStringTokenizedToArray(testString))))*/
  }
  getCrimeReportData(){
    return this.CrimeReportData;
  }
  setCrimeReportData(root,key,data){
    if (root != undefined && root != null) {
      if(this.CrimeReportData[root] == undefined){
        this.CrimeReportData[root] = [];
      }
      //root hace value
      this.CrimeReportData[root].push({key:key,data:data});
    }else{
      //root not have value
      this.CrimeReportData[key] = data;
    }
    //console.log(this.CrimeReportData);
  }

  binarySearch(arrayOfWords, wordToFind, sizeOfArray) {
    let left = 0, right = sizeOfArray - 1, mid;
    while (left < right) {
      mid = Math.floor((right - left + 1) / 2 + left);
      if (arrayOfWords[mid] > wordToFind) {
        right = mid - 1;
      }
      else {
        left = mid;
      }
    }
    if (arrayOfWords[left] == wordToFind) return true;
    return false;
  }

  linearSearch(arrayOfWords, wordToFind, sizeOfArray) {
    for (let i = 0; i < sizeOfArray; ++i) {
      if (arrayOfWords[i] == wordToFind) return true;
    }
    return false;
  }

  getStringTokenizedToArray(stringArg) {

    return (((new String(stringArg)).toLowerCase()).split(" ")).filter(function(item){
      return item != "";
    })
    /*
     return (((new String(stringArg.replace(/[^a-zA-Z0-9 ]/g, " "))).toLowerCase()).split(" ")).filter(function(item){
      return item != "";
    })
     */
  }

  getRemoveStopWordArray(arrayArg){
    var stopWord = chatBotResourceData.NLPData.stopwords;
    for (var wordNo = 0; wordNo < arrayArg.length; wordNo++) {
      if (this.binarySearch(stopWord, arrayArg[wordNo], stopWord.length)) {
        arrayArg.splice(wordNo, 1)
        wordNo = -1;
      }
    }
    return arrayArg;
  }

  crimeRecognizer(arrayArg){
    var left = arrayArg.length;
    var selectedCrimeNo=null;
    for (var crimeNo = 0; crimeNo < chatbotCrimeData.length; crimeNo++) {
      var tempwordmatched = 0;
      var tempLeft = 100;
      for (var wordNo = 0; wordNo < arrayArg.length; wordNo++) {
        var crimeKeywords = chatbotCrimeData[crimeNo].crime.keywords;
        for (var keywordNo = 0; keywordNo < crimeKeywords.length; keywordNo++) {
          if (arrayArg[wordNo] == crimeKeywords[keywordNo]) {
            tempwordmatched++;
            break;
          }
        }
      }
      tempLeft = arrayArg.length - tempwordmatched;
      if (tempLeft < left) {
        left = tempLeft;
        selectedCrimeNo = crimeNo;
      }
    }
    if (left == arrayArg.length) {
      //left value equals to lenth of array mean no word matched hence no crime recognized
      return { isRecognized : false, crimeNo : null ,confirmQuestion : null }
    } else {
      return { isRecognized: true, crimeNo: selectedCrimeNo, confirmQuestion: chatbotCrimeData[selectedCrimeNo].crime.confirmquestion, crimeName: chatbotCrimeData[selectedCrimeNo].crime.crimename}
    }
  }

  subQuestionSetRecognizer(userResponseArray,subQuestionArray) {
    var left = userResponseArray.length;
    var selectedSubQuestionSetNo = null;
    for (var questionSet = 0; questionSet < subQuestionArray.length; questionSet++) {
      var tempwordmatched = 0;
      var tempLeft = 100;
      for (var wordNo = 0; wordNo < userResponseArray.length; wordNo++) {
        var answerKeywords = subQuestionArray[questionSet].answersKeywords;
        for (var keywordNo = 0; keywordNo < answerKeywords.length; keywordNo++) {
          if (userResponseArray[wordNo] == answerKeywords[keywordNo]) {
            tempwordmatched++;
            break;
          }
        }
      }
      tempLeft = userResponseArray.length - tempwordmatched;
      if (tempLeft < left) {
        left = tempLeft;
        selectedSubQuestionSetNo = questionSet;
      }
    }
    if (left == userResponseArray.length) {
      //left value equals to lenth of array mean no word matched hence no crime recognized
      return { isRecognized: false, subQuestionSetNo: null }
    } else {
      return { isRecognized: true, subQuestionSetNo: selectedSubQuestionSetNo }
    }
  }

  /*isResponseValid(arrayArg, typeExpected , length){
    return { isValid: true, warningMessage:null};
  }*/
  isResponseValid(arrayArg, typeExpected, length) {
    if(typeExpected == "varchar"){
      return { isValid: true, warningMessage: null};
    }
    if(typeExpected == "polar"){
      for (let i = 0; i < arrayArg.length; ++i) {
        var str = arrayArg[i];
        if (str == "yes" || str == "no" || str == "true" || str == "false"){
          var polarity 
          if(str == "yes" || str == "true"){
            polarity = true;
          }else{
            polarity = false;
          }
          return { isValid: true, warningMessage: null,polarity : polarity };
        } 
      }
      return { isValid: false, warningMessage: this.chabotDialogue.responseIsNotPolar }
    }
    if(typeExpected == "email"){
      for(let i= 0;i<arrayArg.length;++i){
        if (this.isEmail(arrayArg[i])){
          return { isValid: true, warningMessage: null };
        }
      }
     return { isValid: false, warningMessage: this.chabotDialogue.emailIsInvalid }
    }
    for (let i = 0; i < arrayArg.length; ++i) {
      if (this.getStringType(arrayArg[i]) == typeExpected) {
        if (length == null) 
          return { isValid: true, warningMessage: null };
        else if (length == arrayArg[i].length) 
          return { isValid: true, warningMessage: null };
        else if (length != arrayArg[i].length)  
          return { isValid: false, warningMessage: this.chabotDialogue.lengthIsNotAsExpected }
      }
    }
   return { isValid: false, warningMessage: this.chabotDialogue.invalidResponse };
  }
  getStringType(str) {
    let alphabet = false;
    let numeric = false;
    let lowerAlphabet = 'a', upperAlphabet = 'z', lowerNumeric = '0', upperNumeric = '9';
    for (let i = 0; i < str.length; ++i) {
      if (str.charCodeAt(i) >= lowerAlphabet.charCodeAt(0) && str.charCodeAt(i) <= upperAlphabet.charCodeAt(0)) alphabet = true;
      else if (str.charCodeAt(i) >= lowerNumeric.charCodeAt(0) && str.charCodeAt(i) <= upperNumeric.charCodeAt(0)) numeric = true;
    }
    if (numeric && alphabet) return "alphanumeric";
    else if (numeric) return "numeric";
    else if (alphabet) return "text";
    else return "";
  }
  isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
  }
  
  getQuestion(questionNo,subQuestionSetNo, subQuestionNo){
    if(subQuestionSetNo  == null){
      var question = this.selectedCrimeData.questions[questionNo];
      var totalQuestion = this.selectedCrimeData.questions.length;
      return {
        isItSubQuestion: false,
        totalQuestion: totalQuestion,
        question: question.question,
        type: question.type,
        length: question.length,
        haveSubQuestion: question.haveSubQuestion,
        subQuestion: question.subQuestion,
        field: question.field
      }
    }else{
      var question = this.selectedCrimeData.questions[questionNo].subQuestion[subQuestionSetNo].question[subQuestionNo];
      var totalQuestion = this.selectedCrimeData.questions[questionNo].subQuestion[subQuestionSetNo].question.length;
      return {
        isItSubQuestion: true,
        totalQuestion: totalQuestion,
        question: question.question,
        type: question.type,
        length: question.length,
        field: question.field
      }
    }
  }

  getPesonalQuestion(questionNo,subQuestionSetNo,subQuestionNo){
    if(subQuestionSetNo == null){
      var personalQuestions = chatBotResourceData.PesonalDetailQuestions[questionNo];
      var totalQuestion = chatBotResourceData.PesonalDetailQuestions.length;
      return {
        isItSubQuestion:false,
        totalQuestion: totalQuestion,
        question: personalQuestions.question,
        type: personalQuestions.type,
        length: personalQuestions.length,
        haveSubQuestion: personalQuestions.haveSubQuestion,
        subQuestion: personalQuestions.subQuestion,
        field: personalQuestions.field
      }    
    }else{
      var subPersonalQuestions = chatBotResourceData.PesonalDetailQuestions[questionNo].subQuestion[subQuestionSetNo].question[subQuestionNo];
      var totalQuestions = chatBotResourceData.PesonalDetailQuestions[questionNo].subQuestion[subQuestionSetNo].question.length;
      return {
        isItSubQuestion: true,
        totalQuestion: totalQuestions,
        question: subPersonalQuestions.question,
        type: subPersonalQuestions.type,
        length: subPersonalQuestions.length,
        field: subPersonalQuestions.field
      }
    }
  }
  chatbot(userInputString){
    switch(this.chatbotState){
      case "anonymousPersonGreeting":
        this.chatbotState = "askingDescription";
        this.currentQuestion = chatBotResourceData.DescriptionQuestion;
        this.previousQuestion = this.currentQuestion;
        return {
          count : 4,
          '0':this.chabotDialogue.anonymousGreeting,
          '1':this.chabotDialogue.greeting,
          '2':this.chabotDialogue.anonymousDescriptionProcessStart,
          '3': this.currentQuestion.question
        }
        break;
      case "greeting":
        //greeting message transfered
        this.chatbotState = "askingDetailProcess";
        return {
          count : 1,
          '0': `Hii.. ${this.initialPersonalData.name} <br> ${this.chabotDialogue.greeting}`
        };

      case "askingDetailProcess":
        this.chatbotState = "askingDetailStarting";
        return  {
          count : 1,
          '0': this.chabotDialogue.askingDetailProcessExplain
        };

      case "askingDetailStarting":
        this.chatbotState = "askingDetailStarted";
        this.currentQuestion = this.getPesonalQuestion(this.currentPersonalQuestionNumber,null,null);
        this.isSubQuestionStateActive = this.currentQuestion.haveSubQuestion;
        return {
          count : 1,
          '0': this.currentQuestion.question
        };

      case "askingDetailStarted":
        var userResponsetokens = this.getRemoveStopWordArray(this.getStringTokenizedToArray(userInputString));
        var ReponseValidity = this.isResponseValid(userResponsetokens,this.currentQuestion.type,this.currentQuestion.length);
        if(!ReponseValidity.isValid){
          return {
            count : 2,
            '0': ReponseValidity.warningMessage,
            '1': this.currentQuestion.question
          };
        }else{

          //all correct can be stored in database Personal Details
          if (!this.isSubQuestionStateActive || this.currentQuestion.isItSubQuestion){
            this.setCrimeReportData("personalDetails", this.currentQuestion.field, userInputString);
          }

          if(this.isSubQuestionStateActive){
            //current question has subQuestion
            if(!this.currentQuestion.isItSubQuestion){
               this.subQuestionSet = this.subQuestionSetRecognizer(userResponsetokens, this.currentQuestion.subQuestion);
              if (!this.subQuestionSet.isRecognized) {
                //if response is invalid not recognized
                return {
                  count: 2,
                  '0': this.chabotDialogue.responseNotAsExpected,
                  '1': this.currentQuestion.question
                };
              }else{
                //adding details of subquestion key
                this.setCrimeReportData("personalDetails", this.currentQuestion.field, userInputString);
              } 
            }else{
              this.currentPersonalSubQuestionNumber++;
              if (this.currentPersonalSubQuestionNumber == this.currentQuestion.totalQuestion){
                this.currentPersonalSubQuestionNumber = 0;
                this.isSubQuestionStateActive = false;

                //this is where circle break So joining the circle
                
                //codes to join circle, below code repeated 
                this.currentPersonalQuestionNumber++;
                if (this.currentPersonalQuestionNumber == this.totalPersonalQuestion) {
                  this.chatbotState = "askingDescription";
                  this.currentQuestion = chatBotResourceData.DescriptionQuestion;
                  this.previousQuestion = this.currentQuestion;
                  return {
                    count : 2,
                    '0': this.chabotDialogue.allPersonalDetailTakenMessage,
                    '1': this.currentQuestion.question
                  }
                }
                this.currentQuestion = this.getPesonalQuestion(this.currentPersonalQuestionNumber,null,null);
                this.isSubQuestionStateActive = this.currentQuestion.haveSubQuestion;
                return {
                  count: 1,
                  '0': this.currentQuestion.question
                };
                //end codes to join circle
              }
            }
            this.currentQuestion = this.getPesonalQuestion(this.currentPersonalQuestionNumber, this.subQuestionSet.subQuestionSetNo, this.currentPersonalSubQuestionNumber);
            return {
              count: 1,
              '0': this.currentQuestion.question
            };
          }else{
            this.currentPersonalQuestionNumber++;
            if (this.currentPersonalQuestionNumber == this.totalPersonalQuestion){
              this.chatbotState = "askingDescription";
              this.currentQuestion = chatBotResourceData.DescriptionQuestion;
              this.previousQuestion = this.currentQuestion;
              return {
                count: 2,
                '0': this.chabotDialogue.startTakingDetailsOfCrime,
                '1': this.currentQuestion.question
              }
            }
            this.currentQuestion = this.getPesonalQuestion(this.currentPersonalQuestionNumber,null,null);
            this.isSubQuestionStateActive = this.currentQuestion.haveSubQuestion;
            return {
              count: 1,
              '0': this.currentQuestion.question
            };
          }
        }
      case "askingDescription":
        var userResponsetokens = this.getRemoveStopWordArray(this.getStringTokenizedToArray(userInputString));
        var ReponseValidity = this.isResponseValid(userResponsetokens, this.currentQuestion.type, this.currentQuestion.length);
        if (!ReponseValidity.isValid) {
          return {
            count: 2,
            '0': ReponseValidity.warningMessage,
            '1': this.currentQuestion.question
          };
        } else {
          
          var selectedCrime = this.crimeRecognizer(userResponsetokens);
          if(!selectedCrime.isRecognized){
            return {
              count: 2,
              '0': `<b>${this.chabotDialogue.descriptionNotAsExpected}</b>`,
              '1': `${this.currentQuestion.question}`
            };
          }else{
            
            //all correct can be store description key
            this.setCrimeReportData(null, this.currentQuestion.field, userInputString);
            this.setCrimeReportData(null,"Subject",selectedCrime.crimeName);

            this.chatbotState = "confirmingCrime";
            this.currentQuestion = selectedCrime.confirmQuestion;

            //setting up the global variable for questions 
            this.selectedCrimeData = chatbotCrimeData[selectedCrime.crimeNo].crime;
            this.totalQuestions = chatbotCrimeData[selectedCrime.crimeNo].crime.questions.length;
            return {
              count: 1,
              '0': this.currentQuestion.question
            };
          }
        }
      case "confirmingCrime":
        var userResponsetokens = this.getRemoveStopWordArray(this.getStringTokenizedToArray(userInputString));
        var ReponseValidity = this.isResponseValid(userResponsetokens, this.currentQuestion.type, this.currentQuestion.length);
        if (!ReponseValidity.isValid) {
          return {
            count: 2,
            '0': `<b>${ReponseValidity.warningMessage}</b>`,
            '1': `${this.currentQuestion.question}`
          };
        } else {
        

          if(!ReponseValidity.polarity){
            this.chatbotState = "askingDescription";
            this.currentQuestion = this.previousQuestion;
            return {
              count: 2,
              '0':this.chabotDialogue.descriptionNotAsExpectedNotConfirm,
              '1': this.currentQuestion.question
            };
          }else{
            this.chatbotState = "askingQuestionRelatedToCrime";
            this.currentQuestion = this.getQuestion(this.currentQuestionNumber, null, null);
            this.isSubQuestionStateActive = this.currentQuestion.haveSubQuestion;
            return {
              count: 2,
              '0': this.chabotDialogue.crimeRecognizedMessage,
              '1': this.currentQuestion.question
            };
          }
        }
      case "askingQuestionRelatedToCrime":
          var userResponsetokens = this.getRemoveStopWordArray(this.getStringTokenizedToArray(userInputString));
          var ReponseValidity = this.isResponseValid(userResponsetokens, this.currentQuestion.type, this.currentQuestion.length);
          if (!ReponseValidity.isValid) {
            return {
              count: 2,
              '0': ReponseValidity.warningMessage,
              '1': this.currentQuestion.question
            };
          } else {
            //all correct can be store Crime Question
            if (!this.isSubQuestionStateActive || this.currentQuestion.isItSubQuestion) {
              this.setCrimeReportData("crimeResponse", this.currentQuestion.field, userInputString);
            }
            
            if(this.isSubQuestionStateActive){

              //current question has subQuestion
              if (!this.currentQuestion.isItSubQuestion) {
                this.subQuestionSet = this.subQuestionSetRecognizer(userResponsetokens, this.currentQuestion.subQuestion);
                if (!this.subQuestionSet.isRecognized) {
                  //if response is invalid not recognized
                  return {
                    count: 2,
                    '0': this.chabotDialogue.responseNotAsExpected,
                    '1': this.currentQuestion.question
                  };
                }else{
                  //adding details of subquestion key
                  this.setCrimeReportData("crimeResponse", this.currentQuestion.field, userInputString);
                }
              } else {
                this.currentSubQuestionNumber++;
                if (this.currentSubQuestionNumber == this.currentQuestion.totalQuestion) {
                  this.currentSubQuestionNumber = 0;
                  this.isSubQuestionStateActive = false;

                  //this is where circle break So joining the circle

                  //codes to join circle, below code repeated 
                  this.currentQuestionNumber++;
                  if (this.currentQuestionNumber == this.totalQuestions) {
                    this.chatbotState = "finalState";
                    this.currentQuestion = chatBotResourceData.confirmTermCondition;
                    return {
                      count: 2,
                      '0': this.chabotDialogue.allCrimeDataTaken,
                      '1': this.currentQuestion.question
                    }
                  }
                  this.currentQuestion = this.getQuestion(this.currentQuestionNumber, null, null);
                  this.isSubQuestionStateActive = this.currentQuestion.haveSubQuestion;
                  return {
                    count: 1,
                    '0': this.currentQuestion.question
                  };
                  //end codes to join circle
                }
              }
              this.currentQuestion = this.getQuestion(this.currentQuestionNumber, this.subQuestionSet.subQuestionSetNo, this.currentSubQuestionNumber);
              return {
                count: 1,
                '0': this.currentQuestion.question
              };

            }else{
              this.currentQuestionNumber++;
              if (this.currentQuestionNumber == this.totalQuestions) {
                this.chatbotState = "finalState";
                this.currentQuestion = chatBotResourceData.confirmTermCondition;
                return {
                  count: 2,
                  '0': this.chabotDialogue.allCrimeDataTaken,
                  '1': this.currentQuestion.question
                }
              }
              this.currentQuestion = this.getQuestion(this.currentQuestionNumber,null,null);
              this.isSubQuestionStateActive = this.currentQuestion.haveSubQuestion;
              return {
                count: 1,
                '0': this.currentQuestion.question
              };
            }
          }
      case "finalState":
        var userResponsetokens = this.getRemoveStopWordArray(this.getStringTokenizedToArray(userInputString));
        var ReponseValidity = this.isResponseValid(userResponsetokens, this.currentQuestion.type, this.currentQuestion.length);
        if (!ReponseValidity.isValid) {
          return {
            count: 2,
            '0': `<b>${ReponseValidity.warningMessage}</b>`,
            '1': `${this.currentQuestion.question}`
          };
        } else {
          if (ReponseValidity.polarity){
            return {
              count: 1,
              '0': this.chabotDialogue.lastMessage,
              chatbotSessionEnd: true,
              crimeReportData: this.getCrimeReportData()
            }
          }else{
            return {
              count: 1,
              '0': "Then also you have to register this complaint",
              chatbotSessionEnd: true,
            }
          }          
        }   
    }
  }
}
export default ChatbotCore;