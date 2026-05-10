<template>
  <main class="flex-grow flex items-center justify-center p-4">
    <div class="bg-gray-900 p-6 rounded-2xl shadow-xl w-80">
      <div class="bg-gray-100 p-4 rounded-lg mb-4 text-right font-mono flex flex-col justify-end min-h-[5rem]">
        <div class="text-sm text-gray-500 min-h-[1.25rem] mb-1 break-all">{{ formattedPrevious }} {{ operation }}</div>
        <div class="text-3xl font-bold text-gray-800 break-all">{{ currentOperand }}</div>
      </div>

      <div class="flex justify-end mb-3">
        <label class="text-gray-300 text-sm flex items-center cursor-pointer hover:text-white transition">
          <span class="mr-2">Режим програміста</span>
          <input type="checkbox" v-model="isProgMode" class="w-4 h-4 accent-blue-500 rounded">
        </label>
      </div>

      <div v-show="isProgMode" class="grid grid-cols-4 gap-3 mb-4 border-b border-gray-700 pb-4">
        <button @click="changeBase(16)" :class="currentBase === 16 ? 'bg-purple-800 ring-2 ring-white' : 'bg-purple-600'" class="hover:bg-purple-700 text-white p-2 rounded-lg font-bold text-sm transition">HEX</button>
        <button @click="changeBase(10)" :class="currentBase === 10 ? 'bg-purple-800 ring-2 ring-white' : 'bg-purple-600'" class="hover:bg-purple-700 text-white p-2 rounded-lg font-bold text-sm transition">DEC</button>
        <button @click="changeBase(8)" :class="currentBase === 8 ? 'bg-purple-800 ring-2 ring-white' : 'bg-purple-600'" class="hover:bg-purple-700 text-white p-2 rounded-lg font-bold text-sm transition">OCT</button>
        <button @click="changeBase(2)" :class="currentBase === 2 ? 'bg-purple-800 ring-2 ring-white' : 'bg-purple-600'" class="hover:bg-purple-700 text-white p-2 rounded-lg font-bold text-sm transition">BIN</button>
      </div>

      <div class="grid grid-cols-4 gap-3">
        <button @click="clear" class="bg-gray-300 hover:bg-gray-400 p-3 rounded-lg font-bold text-xl">AC</button>
        <button @click="inverse" class="bg-gray-300 hover:bg-gray-400 p-3 rounded-lg font-bold text-xl">±</button>
        <button @click="percentage" class="bg-gray-300 hover:bg-gray-400 p-3 rounded-lg font-bold text-xl">%</button>
        <button @click="chooseOperation('÷')" class="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg font-bold text-xl">÷</button>
        
        <button @click="appendNumber('7')" class="bg-white hover:bg-gray-200 p-3 rounded-lg font-bold text-xl">7</button>
        <button @click="appendNumber('8')" class="bg-white hover:bg-gray-200 p-3 rounded-lg font-bold text-xl">8</button>
        <button @click="appendNumber('9')" class="bg-white hover:bg-gray-200 p-3 rounded-lg font-bold text-xl">9</button>
        <button @click="chooseOperation('×')" class="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg font-bold text-xl">×</button>
        
        <button @click="appendNumber('4')" class="bg-white hover:bg-gray-200 p-3 rounded-lg font-bold text-xl">4</button>
        <button @click="appendNumber('5')" class="bg-white hover:bg-gray-200 p-3 rounded-lg font-bold text-xl">5</button>
        <button @click="appendNumber('6')" class="bg-white hover:bg-gray-200 p-3 rounded-lg font-bold text-xl">6</button>
        <button @click="chooseOperation('−')" class="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg font-bold text-xl">−</button>
        
        <button @click="appendNumber('1')" class="bg-white hover:bg-gray-200 p-3 rounded-lg font-bold text-xl">1</button>
        <button @click="appendNumber('2')" class="bg-white hover:bg-gray-200 p-3 rounded-lg font-bold text-xl">2</button>
        <button @click="appendNumber('3')" class="bg-white hover:bg-gray-200 p-3 rounded-lg font-bold text-xl">3</button>
        <button @click="chooseOperation('+')" class="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg font-bold text-xl">+</button>
        
        <button @click="appendNumber('0')" class="bg-white hover:bg-gray-200 p-3 rounded-lg font-bold text-xl col-span-2">0</button>
        <button @click="appendDecimal" class="bg-white hover:bg-gray-200 p-3 rounded-lg font-bold text-xl">,</button>
        <button @click="compute" class="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg font-bold text-xl">=</button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';

const currentOperand = ref('0');
const previousOperand = ref('');
const operation = ref(null);
const waitingForNewValue = ref(false);

const isProgMode = ref(false);
const currentBase = ref(10);

watch(isProgMode, (newVal) => {
  if (!newVal) {
    changeBase(10);
  }
});

const formattedPrevious = computed(() => {
  if (previousOperand.value === '') return '';
  if (currentBase.value !== 10) {
    return Math.trunc(parseFloat(previousOperand.value)).toString(currentBase.value).toUpperCase();
  }
  return String(previousOperand.value).replace('.', ',');
});

const getInputValue = () => {
  if (currentBase.value === 10) {
    return parseFloat(currentOperand.value.replace(',', '.'));
  } else {
    return parseInt(currentOperand.value, currentBase.value);
  }
};

const formatValue = (value) => {
  if (isNaN(value) || !isFinite(value)) return 'Помилка';
  if (currentBase.value === 10) {
    let strValue = String(value);
    if (strValue.replace(/[^0-9]/g, '').length > 12) {
      strValue = Number(value).toExponential(6); 
    }
    return strValue.replace('.', ','); 
  } else {
    return Math.trunc(value).toString(currentBase.value).toUpperCase(); 
  }
};

const clear = () => {
  currentOperand.value = '0';
  previousOperand.value = '';
  operation.value = null;
  waitingForNewValue.value = false;
  isProgMode.value = false; 
};

const deleteLast = () => {
  if (waitingForNewValue.value || currentOperand.value === 'Помилка') return;
  currentOperand.value = currentOperand.value.slice(0, -1);
  if (currentOperand.value === '' || currentOperand.value === '-') {
    currentOperand.value = '0';
  }
};

const changeBase = (newBase) => {
  if (currentBase.value === newBase || currentOperand.value === 'Помилка') return;
  const decValue = getInputValue(); 
  currentBase.value = newBase;
  currentOperand.value = formatValue(decValue); 
  waitingForNewValue.value = true;
};

const appendNumber = (digit) => {
  if (currentBase.value === 2 && !/^[01]$/.test(digit)) return;
  if (currentBase.value === 8 && !/^[0-7]$/.test(digit)) return;
  if (currentBase.value === 10 && !/^[0-9]$/.test(digit)) return;
  if (currentBase.value === 16 && !/^[0-9A-F]$/.test(digit)) return;

  if (waitingForNewValue.value) {
    currentOperand.value = digit;
    waitingForNewValue.value = false;
    if (operation.value === null) {
      previousOperand.value = '';
    }
  } else {
    currentOperand.value = currentOperand.value === '0' ? digit : currentOperand.value + digit;
  }
};

const appendDecimal = () => {
  if (currentBase.value !== 10) return;
  if (waitingForNewValue.value) {
    currentOperand.value = '0,';
    waitingForNewValue.value = false;
    if (operation.value === null) {
      previousOperand.value = '';
    }
    return;
  }
  if (!currentOperand.value.includes(',')) {
    currentOperand.value += ',';
  }
};

const inverse = () => {
  if (currentOperand.value === '0') return;
  const val = getInputValue() * -1;
  currentOperand.value = formatValue(val);
};

const percentage = () => {
  if (currentBase.value !== 10) return;
  const val = getInputValue() / 100;
  currentOperand.value = formatValue(val);
};

const chooseOperation = (op) => {
  if (currentOperand.value === 'Помилка') return;
  const inputValue = getInputValue();
  
  if (operation.value && waitingForNewValue.value) {
    operation.value = op;
    return;
  }
  
  if (previousOperand.value === '' && !isNaN(inputValue)) {
    previousOperand.value = inputValue.toString();
  } else if (operation.value) {
    compute();
  }
  
  waitingForNewValue.value = true;
  operation.value = op;
};

const compute = () => {
  if (operation.value === null || waitingForNewValue.value) return;
  
  const prev = parseFloat(previousOperand.value.replace(',', '.'));
  const current = getInputValue();
  
  if (isNaN(prev) || isNaN(current)) return;

  let result;
  switch (operation.value) {
    case '+': result = prev + current; break;
    case '−': result = prev - current; break;
    case '×': result = prev * current; break;
    case '÷': 
      if (current === 0) {
        currentOperand.value = 'Помилка';
        previousOperand.value = '';
        operation.value = null;
        waitingForNewValue.value = true;
        return;
      }
      result = prev / current; 
      break;
    default: return;
  }

  if (currentBase.value === 10) {
      result = Math.round(result * 10000000000) / 10000000000;
  }
  
  currentOperand.value = formatValue(result);
  previousOperand.value = result.toString();
  operation.value = null;
  waitingForNewValue.value = true;
};

const handleKeydown = (event) => {
  let key = event.key;

  const keyMapping = {
    'Enter': '=',
    'Escape': 'AC',
    'Delete': 'AC',
    'Backspace': '⌫',
    '.': ',',
    '*': '×',
    '/': '÷',
    '-': '−'
  };

  if (keyMapping[key]) {
    key = keyMapping[key];
  } else if (/^[a-f]$/i.test(key)) {
    key = key.toUpperCase(); 
  }

  if (/^[0-9A-F]$/.test(key)) {
    event.preventDefault();
    appendNumber(key);
  } else if (['+', '−', '×', '÷'].includes(key)) {
    event.preventDefault();
    chooseOperation(key);
  } else if (key === '=') {
    event.preventDefault();
    compute();
  } else if (key === 'AC') {
    event.preventDefault();
    clear();
  } else if (key === '⌫') {
    event.preventDefault();
    deleteLast();
  } else if (key === ',') {
    event.preventDefault();
    appendDecimal();
  } else if (key === '%') {
    event.preventDefault();
    percentage();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>