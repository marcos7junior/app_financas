const form = document.querySelector('form');
const tbody = document.querySelector('tbody');

let selectTypeValue = 'entry';
let transactions = [];
let countTransactions = 1;

let balanceDash = 0;
let entryDash = 0;
let outputDash = 0;

function main() {
  handleSelectType('entry');
  transactions = getData('transactions') || [];

  dashCalculator();
  generateTrs(transactions);
}

const getLastCountTransactions = () => {
  countTransactions = getData('count-transactions') || 1;
  return countTransactions;
};

const handleSelectType = (type) => {
  selectTypeValue = type;

  const btnSelectEntry = document.getElementById('btnSelectEntry');
  const btnSelectOutput = document.getElementById('btnSelectOutput');

  btnSelectEntry.classList.remove('btnSelectEntry');
  btnSelectOutput.classList.remove('btnSelectOutput');

  if (type === 'output') {
    btnSelectOutput.classList.add('btnSelectOutput');
  }

  if (type === 'entry') {
    btnSelectEntry.classList.add('btnSelectEntry');
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  let transaction = {
    code: getLastCountTransactions(),
    name: '',
    value: 0,
    date: dateValidate(),
    type: 'entry',
  };

  for (var pair of formData.entries()) {
    if (pair[0] === 'name') {
      transaction.name = pair[1];
    }

    if (pair[0] === 'value') {
      transaction.value = pair[1];
    }
  }

  if (selectTypeValue === 'entry') {
    transaction.type = 'RECEITA';
  } else {
    transaction.type = 'DESPESA';
  }

  transactions.push(transaction);
  form.reset();
  countTransactions++;
  saveData('count-transactions', countTransactions);
  saveData('transactions', transactions);
  generateTrs(getData('transactions'));
};

const removeTransaction = () => {
  const inputCodeRemoveTransaction = Number(
    document.getElementById('inputCodeRemoveTransaction').value
  );

  transactions = transactions.filter((transaction) => {
    return transaction.code !== inputCodeRemoveTransaction;
  });

  saveData('transactions', transactions);

  const trDelete = document.getElementById(`tr#${inputCodeRemoveTransaction}`);

  tbody.removeChild(trDelete);
};

const generateTrs = (transactions) => {
  const allTrs = tbody.querySelectorAll('tr');
  allTrs.forEach((tr) => tbody.removeChild(tr));

  transactions.forEach((transaction) => {
    let tr = document.createElement('tr');

    Object.values(transaction).forEach((value) => {
      let td = document.createElement('td');
      tr.setAttribute('id', `tr#${transaction.code}`);

      if (value === 'RECEITA') {
        td.classList.add('badge2');
        td.classList.add('bg-success');
      }

      if (value === 'DESPESA') {
        td.classList.add('badge2');
        td.classList.add('bg-danger');
      }

      td.textContent = value;
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
};

const dateValidate = () => {
  const date = new Date().toLocaleDateString();
  const hour = new Date().getHours();
  const min = new Date().getMinutes();
  return `${date} ${hour}:${min}`;
};

const getData = (key) => {
  const data = window.localStorage.getItem(key);
  return JSON.parse(data);
};

const saveData = (key, value) => {
  if (key === 'transactions') {
    dashCalculator();
  }

  window.localStorage.setItem(key, JSON.stringify(value));
};

const dashCalculator = () => {
  balanceDash = 0
  entryDash = 0
  outputDash = 0

  transactions.forEach((transaction) => {
    if (transaction.type == 'RECEITA') {
        console.log('RECEITA');
        entryDash += Number(transaction.value);
    }
    else {
      console.log('DESPESA');
      outputDash += Number(transaction.value)
    };

    balanceDash = entryDash - outputDash;
  });

  document.getElementById('balanceDash').innerText = 
    `R$ ${balanceDash.toFixed(2)}`;
  document.getElementById('entryDash').innerText = 
    `R$ ${entryDash.toFixed(2)}`;
  document.getElementById('outputDash').innerText = 
    `R$ ${outputDash.toFixed(2)}`;
};

main();
