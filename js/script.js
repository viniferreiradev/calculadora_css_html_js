// DOM Elements
const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');
const displayEl = document.querySelector('.display__calculate');

const acEl = document.querySelector('.ac');
const pmEl = document.querySelector('.pm');
const percentEl = document.querySelector('.percent');

const divisionEl = document.querySelector('.division');
const multiplicationEl = document.querySelector('.multiplication');
const substrationEl = document.querySelector('.substration');
const additionEl = document.querySelector('.addition');
const equalEl = document.querySelector('.equal');
const decimalEl = document.querySelector('.decimal');

const number1El = document.querySelector('.number-1');
const number2El = document.querySelector('.number-2');
const number3El = document.querySelector('.number-3');
const number4El = document.querySelector('.number-4');
const number5El = document.querySelector('.number-5');
const number6El = document.querySelector('.number-6');
const number7El = document.querySelector('.number-7');
const number8El = document.querySelector('.number-8');
const number9El = document.querySelector('.number-9');
const number0El = document.querySelector('.number-0');
const numberElArray = [
    number0El, number1El, number2El, number3El, number4El,
     number5El, number6El, number7El, number8El, number9El
];

// Variables
    let valueStrInMemory = null;
    let operationInMemory = null;


// Function
const getValueAsStr = () => displayEl.textContent.split(',').join('');

const getValueAsNum = () => {
    return parseFloat(getValueAsStr());
};

const setStrAsValue = (valueStr) => {
    if (valueStr[valueStr.length - 1] === '.'){
        displayEl.textContent += '.';
        return;
    }

    const [wholeNumStr, decimalStr] = valueStr.split('.');
    if (decimalStr) {
        displayEl.textContent = parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr;
    } else {
        displayEl.textContent = parseFloat(wholeNumStr).toLocaleString();
    }
};


const handleNumberClick = (numStr) => {
    const currentValeuStr = getValueAsStr();
    if(currentValeuStr === '0'){
        setStrAsValue(numStr);
    }else{
        setStrAsValue(currentValeuStr + numStr);
    }
};


const getResultOperationAsStr = () => {
    const currentValueNum = getValueAsNum();
    const valueNumInMemory = parseFloat(valueStrInMemory);
    let newValueNum;
    
    if(operationInMemory === 'division'){
        newValueNum = valueNumInMemory / currentValueNum;
    }else if (operationInMemory === 'multiplication'){
        newValueNum = valueNumInMemory * currentValueNum;
    }else if (operationInMemory === 'addition'){
        newValueNum = valueNumInMemory + currentValueNum;
    }else if (operationInMemory === 'substration'){
        newValueNum = valueNumInMemory - currentValueNum;
    }

    return newValueNum.toString();
};


const handleOperationClick = (operation) => {
    const currentValeuStr = getValueAsStr();
    if (!valueStrInMemory){
        valueStrInMemory = currentValeuStr;
        operationInMemory = operation;
        setStrAsValue('0');
        return;
    }

    valueStrInMemory = getResultOperationAsStr();
    operationInMemory = operation;
    setStrAsValue('0');
};



// Add Event Listener to Functions
acEl.addEventListener('click', () => {
    setStrAsValue('0');
    valueStrInMemory = null;
    operationInMemory = null;

});
pmEl.addEventListener('click', () => {
    const currentValueNum = getValueAsNum();
    const currentValeuStr = getValueAsStr();

    if (currentValeuStr === '-0'){
        setStrAsValue('0');
        return
    }

    if (currentValueNum >= 0){
        setStrAsValue('-' + currentValeuStr);
    }else{
        setStrAsValue(currentValeuStr.substring(1));
    }
});
percentEl.addEventListener('click', () =>{
    const currentValueNum = getValueAsNum();
    const newValueNum = currentValueNum / 100;
    setStrAsValue(newValueNum.toString());
    valueStrInMemory = null;
    operationInMemory = null;
});

// Add Event Listener to Number and Decimals
for(let i=0; i<numberElArray.length; i++) {
    const numberEl = numberElArray[i];
    numberEl.addEventListener('click', () => {
        handleNumberClick(i.toString());
    });
}
decimalEl.addEventListener('click', () =>{
    const currentValueStr = getValueAsStr();
    if(!currentValueStr.includes('.')){
        setStrAsValue(currentValueStr + '.');
    }
});


// Add Event Listener to Operations
divisionEl.addEventListener('click', () => {
    handleOperationClick('division');
});
multiplicationEl.addEventListener('click', () => {
    handleOperationClick('multiplication');
});
additionEl.addEventListener('click', () => {
    handleOperationClick('addition');
});
substrationEl.addEventListener('click', () => {
    handleOperationClick('substration');
});
equalEl.addEventListener('click', () => {
    if (valueStrInMemory) {
        setStrAsValue(getResultOperationAsStr());
        valueStrInMemory = null;
        operationInMemory = null;
    }
});

// Set up the time
const updateTime = () =>{
    const currentTime = new Date();
    
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    
    hourEl.textContent = currentHour.toString();
    minuteEl.textContent = currentMinute.toString().padStart(2, '0');
}
setInterval(updateTime => {}, 1000);
    updateTime();
