const form = document.querySelector('form');
const tbody = document.querySelector('tbody');

let selectTypeValue = 'entry';

let transactions = [];
let transactionsData = [];
let countTransactions = 1;

function main() {
  handleSelectType('entry');
}

const getTransations = () => {
  const data = window.localStorage.getItem('transactions');
  return JSON.parse(data);
};

const saveTransactions = (transactions) => {
  window.localStorage.setItem('transactions', JSON.stringify(transactions));
  transactionsData = transactions;
};

const loadTable = () => {
  for (const transaction of transactions) {
    console.log('tra', transaction);
  }
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
    code: countTransactions,
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

  transaction.type = selectTypeValue;

  newTransaction(transaction);

  loadTable();
  countTransactions++;
};

const newTransaction = (transaction) => {
  let tr = document.createElement('tr');

  console.log(transaction);

  if (transaction.type === 'entry') {
    transaction.type = 'RECEITA';
  } else {
    transaction.type = 'DESPESA';
  }

  Object.values(transaction).forEach((value) => {
    let td = document.createElement('td');
    tr.setAttribute('id', `tr#${transaction.code}`);
    console.log(value);
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
  transactions.push(tr);
  form.reset();

  console.log(transactions);
};

const removeTransaction = () => {
  const inputCodeRemoveTransaction = document.getElementById(
    'inputCodeRemoveTransaction'
  ).value;

  const trDelete = document.getElementById(`tr#${inputCodeRemoveTransaction}`);

  const td = trDelete.childNodes[0].innerText;
  console.log(td);
  tbody.removeChild(trDelete);
};

const dateValidate = () => {
  const date = new Date().toLocaleDateString();
  const hour = new Date().getHours();
  const min = new Date().getMinutes();
  return `${date} ${hour}:${min}`;
};

main();
