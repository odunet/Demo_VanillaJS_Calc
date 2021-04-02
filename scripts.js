//Initialize DOM object representing the ResultPad
let resultPan = document.getElementById("resultPan");

//Initialize an empty list to take data input from client
var calcPad = [];

//Window event listener for all click events
window.addEventListener("click", (e) =>{

    //Condition is evluated if a number button is clicked
    if (e.target.classList[0] == "calculatorButtonN") {

        //If input value is less than twelve, evaluate code. This will reduce data in pad
        if (calcPad.length < 12) {

            //Check a sign had been previously inputed
            if (calcPad[0] == "nullS" || calcPad[0] == "null" ){
                calcPad.push(document.getElementById(e.target.id).value);

                //Check if there is a number already inputed after operator
                if (calcPad[1] == "nullS") {
                    var tempCalcPad = Object.assign([], calcPad);

                    tempCalcPad.shift();
                    tempCalcPad.shift();
        
                    resultPan.innerHTML = tempCalcPad.join(""); 
                } 
                //Check if there is a number was never inputed after operator
                else {
                    calcPad.unshift("null");

                    var tempCalcPad = Object.assign([], calcPad);

                    tempCalcPad.shift();
                    tempCalcPad.shift();

                    resultPan.innerHTML = tempCalcPad.join(""); 
                }
            } 
            //Evaluate if a symbol has never been inputed in the pad
            else {
                calcPad.push(document.getElementById(e.target.id).value);

                resultPan.innerHTML = calcPad.join(""); 
            }
        } 
        //Raises alert if pad input exceeds 12 digits, including operator
        else {
            alert("Input limit reached");
        }
    }

    //Evaluates if the enter button is pressed
    else if (e.target.classList[0] == "calculatorButtonE") {

        //Raises alert if the pad is empty or if the last input was a symbol
        if (calcPad.length < 1 || calcPad[0][0] != "n") {
            alert("Input expression before enter");
        } 
        
        //Evaluates the code if you have an equation in the form "a x b"
        else if (calcPad[0] == "null" && calcPad[1] == "nullS"){
            calcPad.shift();
            calcPad.shift();
            calcPad.join("")
            let tempCalcResult = calcPad.join("").split(" ");
            let firstNumber = parseFloat(tempCalcResult[0]);
            let secondNumber = parseFloat(tempCalcResult[2]);
            
            //Evaluate the code based on the operator inputed.
            switch (tempCalcResult[1]) {
                case 'X': 
                    var finalResult = firstNumber * secondNumber;
                    resultPan.innerHTML = finalResult; 
                    break;
             
                case '/': 
                    var finalResult = firstNumber / secondNumber;
                    resultPan.innerHTML = finalResult; 
                    break;
             
                case '-': 
                    var finalResult = firstNumber - secondNumber;
                    resultPan.innerHTML = finalResult; 
                    break;
             
                case '+': 
                    var finalResult = firstNumber + secondNumber;
                    resultPan.innerHTML = finalResult; 
                    break;
             
                default:  alert("Check your expression")
             }
        }
    }

    //Evaluates if the operator is pressed
    else if (e.target.classList[0] == "calculatorButtonS") {
        //Raises an alert if the pad is empty or if a symbol had previously been inputed.
        if (calcPad.length < 1 || calcPad[0] == "nullS" || calcPad[1] == "nullS") {
            alert("Operation not allowed");
        } 

        //Evaluate if the a symbol is the last thing inputed
         else if (calcPad[0] != "nullS") {
            calcPad.push(` ${document.getElementById(e.target.id).value} `);

            calcPad.unshift("nullS");

            var tempCalcPad = Object.assign([], calcPad);

            tempCalcPad.shift();

            resultPan.innerHTML = tempCalcPad.join(""); 
        }
    }

    //Evaluates if the clear button is pressed. This clears the pad.
    else if (e.target.classList[0] == "calculatorButtonC") {
        calcPad = [];
        resultPan.innerHTML = calcPad.join(""); 
    }

    //Evaluates if the sign change button is pressed.
    else if (e.target.classList[0] == "calculatorButtonSN") {
        //checks if the pad is empty or if the last typed value is an operator
        if (calcPad.length < 1 || calcPad[calcPad.length-1].length > 1) {
            alert("Operation not allowed");
        }
        //checked that an equation is inputed in the format "a + b"
        else if (calcPad[1] == "nullS" && calcPad[0] == "null") {
            let tempSignChangeCalcResult = calcPad.join("").split(" ");
            let firstSignChangeNumber = parseFloat(tempSignChangeCalcResult[2]);
            firstSignChangeNumber = -1 * firstSignChangeNumber

            //Remove the edited number(s) from pad
            tempSignChangeCalcResult[2].split("").forEach( () => {calcPad.pop() })

            //Convert number with the sign change to a string and push to the calculator pad
            let tempIterator = firstSignChangeNumber.toString();
            for (let i = 0; i < tempIterator.length; i++) {
                calcPad.push(tempIterator[i]);
            }

            //clean up pad and display
            var tempCalcPad = Object.assign([], calcPad);

            tempCalcPad.shift();
            tempCalcPad.shift();

            resultPan.innerHTML = tempCalcPad.join(""); 
        }

        //Evaluates this if a number has been inputed but not operator.
        else {
            let tempSignChangeCalcResult_Single = calcPad.join("");
            let firstSignChangeNumber_Single = parseFloat(tempSignChangeCalcResult_Single);
            firstSignChangeNumber_Single = -1 * firstSignChangeNumber_Single;

            calcPad = firstSignChangeNumber_Single.toString().split("");

            //clean up pad and display
            var tempCalcPad = Object.assign([], calcPad);

            resultPan.innerHTML = tempCalcPad.join(""); 
        }
    }
})