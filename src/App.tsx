import './App.css'
import { useEffect, useState } from 'react'

type Transaction = {
  code: string,
  name: string
  value: number
  date: string
  type: TypeTransaction,
}

type TypeTransaction = 'entry' | 'output'

type DashValuesType = {
  balanceDash: number
  entryDash: number
  outputDash: number
}

function App() {
  const logoCashApp = 'public/logo.png'
  const [transaction, setTransaction] = useState<Transaction>({
    code: '1',
    date: new Date().toLocaleDateString(),
    name: '',
    value: 0,
    type: 'entry'
  })
  const [transactions, setTransactions] = useState<Array<Transaction>>([])
  const [dashValues, setDashValues] = useState<DashValuesType>({
    balanceDash: 0,
    entryDash: 0,
    outputDash: 0
  })

  useEffect(() => {
    console.log(dashValues);
  }, [dashValues])

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setTransactions([...transactions, transaction])
    console.log(transactions);
    dashCalculator()
  }

  const handleOnChange = (e: any) => {
    const name = e.target.name
    const value = e.target.value
    setTransaction({ ...transaction, [name]: value, code: new Date().getTime().toString(), date: dateValidate() })
  }

  const handleSelectTypeTransaction = (type: TypeTransaction) => {
    setTransaction({ ...transaction, type })
  }

  const dashCalculator = () => {

    let balance: number = 0
    let entry: number = 0
    let output: number = 0

    transactions.forEach((transaction) => {
      if (transaction.type == 'entry') {
        if (Number(transaction.value)) {
          entry = dashValues.entryDash
          entry += Number(transaction.value)
        }
      }
      else {
        output = dashValues.outputDash
        output += Number(transaction.value)
      };
      balance = entry - output
    });

    setDashValues({
      entryDash: entry,
      outputDash: output,
      balanceDash: balance
    })



    //   document.getElementById('balanceDash').innerText =
    //     `R$ ${balanceDash.toFixed(2)}`;
    //   document.getElementById('entryDash').innerText =
    //     `R$ ${entryDash.toFixed(2)}`;
    //   document.getElementById('outputDash').innerText =
    //     `R$ ${outputDash.toFixed(2)}`;
  }

  const dateValidate = () => {
    const date = new Date().toLocaleDateString();
    const hour = new Date().getHours();
    const min = new Date().getMinutes();
    return `${date} ${hour}:${min}`;
  };



  // const transaction = {
  //   code: getLastCountTransactions(),
  //   name: '',
  //   value: 0,
  //   date: dateValidate(),
  //   type: 'entry',
  // };

  // setTransactions(transaction)

  // const form = document.querySelector('form');
  // const tbody = document.querySelector('tbody');

  // let selectTypeValue = 'entry';
  // let transactions = [];
  // let countTransactions = 1;

  // let balanceDash = 0;
  // let entryDash = 0;
  // let outputDash = 0;

  // function main() {
  //   handleSelectType('entry');
  //   transactions = getData('transactions') || [];

  //   dashCalculator();
  //   generateTrs(transactions);
  // }

  // const getLastCountTransactions = () => {
  //   countTransactions = getData('count-transactions') || 1;
  //   return countTransactions;
  // };

  // const handleSelectType = (type) => {
  //   selectTypeValue = type;

  //   const btnSelectEntry = document.getElementById('btnSelectEntry');
  //   const btnSelectOutput = document.getElementById('btnSelectOutput');

  //   btnSelectEntry.classList.remove('btnSelectEntry');
  //   btnSelectOutput.classList.remove('btnSelectOutput');

  //   if (type === 'output') {
  //     btnSelectOutput.classList.add('btnSelectOutput');
  //   }

  //   if (type === 'entry') {
  //     btnSelectEntry.classList.add('btnSelectEntry');
  //   }
  // };



  //   for (var pair of formData.entries()) {
  //     if (pair[0] === 'name') {
  //       transaction.name = pair[1];
  //     }

  //     if (pair[0] === 'value') {
  //       transaction.value = pair[1];
  //     }
  //   }

  //   if (selectTypeValue === 'entry') {
  //     transaction.type = 'RECEITA';
  //   } else {
  //     transaction.type = 'DESPESA';
  //   }

  //   transactions.push(transaction);
  //   form.reset();
  //   countTransactions++;
  //   saveData('count-transactions', countTransactions);
  //   saveData('transactions', transactions);
  //   generateTrs(getData('transactions'));
  // };

  // const removeTransaction = () => {
  //   const inputCodeRemoveTransaction = Number(
  //     document.getElementById('inputCodeRemoveTransaction').value
  //   );

  //   transactions = transactions.filter((transaction) => {
  //     return transaction.code !== inputCodeRemoveTransaction;
  //   });

  //   saveData('transactions', transactions);

  //   const trDelete = document.getElementById(`tr#${inputCodeRemoveTransaction}`);

  //   tbody.removeChild(trDelete);
  // };

  // const generateTrs = (transactions) => {
  //   const allTrs = tbody.querySelectorAll('tr');
  //   allTrs.forEach((tr) => tbody.removeChild(tr));

  //   transactions.forEach((transaction) => {
  //     let tr = document.createElement('tr');

  //     Object.values(transaction).forEach((value) => {
  //       let td = document.createElement('td');
  //       tr.setAttribute('id', `tr#${transaction.code}`);

  //       if (value === 'RECEITA') {
  //         td.classList.add('badge2');
  //         td.classList.add('bg-success');
  //       }

  //       if (value === 'DESPESA') {
  //         td.classList.add('badge2');
  //         td.classList.add('bg-danger');
  //       }

  //       td.textContent = value;
  //       tr.appendChild(td);
  //     });

  //     tbody.appendChild(tr);
  //   });
  // };

  // const dateValidate = () => {
  //   const date = new Date().toLocaleDateString();
  //   const hour = new Date().getHours();
  //   const min = new Date().getMinutes();
  //   return `${date} ${hour}:${min}`;
  // };

  // const getData = (key) => {
  //   const data = window.localStorage.getItem(key);
  //   return JSON.parse(data);
  // };

  // const saveData = (key, value) => {
  //   if (key === 'transactions') {
  //     dashCalculator();
  //   }

  //   window.localStorage.setItem(key, JSON.stringify(value));
  // };

  // const dashCalculator = () => {
  //   balanceDash = 0
  //   entryDash = 0
  //   outputDash = 0

  //   transactions.forEach((transaction) => {
  //     if (transaction.type == 'RECEITA') {
  //       console.log('RECEITA');
  //       entryDash += Number(transaction.value);
  //     }
  //     else {
  //       console.log('DESPESA');
  //       outputDash += Number(transaction.value)
  //     };

  //     balanceDash = entryDash - outputDash;
  //   });

  //   document.getElementById('balanceDash').innerText =
  //     `R$ ${balanceDash.toFixed(2)}`;
  //   document.getElementById('entryDash').innerText =
  //     `R$ ${entryDash.toFixed(2)}`;
  //   document.getElementById('outputDash').innerText =
  //     `R$ ${outputDash.toFixed(2)}`;
  // };


  return (
    <div className="App">
      <div className="wrapper">
        <div
          className="preloader flex-column justify-content-center align-items-center"
          style={{ height: '0px' }}
        ></div>

        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          <ul className="navbar-nav">
            <li className="nav-item">
              <img src={logoCashApp} className="logo-app" />
            </li>
          </ul>
        </nav>

        <div className="content-wrapper">
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0">Dashboard</h1>
                </div>
              </div>
            </div>
          </div>

          <section className="content">
            <div className="container-fluid">

              <div className="row">
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-info">
                    <div className="inner">
                      <h3 id="balanceDash">150</h3>
                      <p>Saldo Atual</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-bag"></i>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-6">
                  <div className="small-box bg-success">
                    <div className="inner">
                      <h3 id="entryDash">
                        53<sup style={{ fontSize: '20px' }}></sup>
                      </h3>
                      <p>Receitas</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-stats-bars"></i>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-6">
                  <div className="small-box bg-danger">
                    <div className="inner">
                      <h3 id="outputDash">44</h3>
                      <p>Despesas</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-person-add"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <section className="col-lg-5 connectedSortable ui-sortable">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Adicione uma nova entrada/saída</h3>
                    </div>
                    <div className="card-body">
                      <form
                        name="formTransactions"
                        onSubmit={(e: any) => handleSubmit(e)}
                      >
                        <div className="select-type">
                          <div
                            id="btnSelectEntry"
                            className={`btn-select ${transaction.type === 'entry' ? 'btnSelectEntry' : ''}`}
                            onClick={() => handleSelectTypeTransaction('entry')}
                          >
                            ENTRADA
                          </div>
                          <div
                            id="btnSelectOutput"
                            className={`btn-select ${transaction.type === 'output' ? 'btnSelectOutput' : ''}`}
                            onClick={() => handleSelectTypeTransaction('output')}
                          >
                            SAÍDA
                          </div>
                        </div>

                        <div className="users-entry">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">Nome</span>
                            </div>
                            <input
                              name="name"
                              type="text"
                              className="form-control"
                              onChange={(e) => handleOnChange(e)}
                            />
                          </div>

                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="fas fa-dollar-sign"></i>
                              </span>
                            </div>
                            <input
                              name="value"
                              type="text"
                              className="form-control"
                              onChange={(e) => handleOnChange(e)}
                            />
                          </div>

                          <div>
                            <button className="btn btn-success" type="submit">
                              Adicionar
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </section>

                <section className="col-lg-7 connectedSortable ui-sortable">
                  <div className="card">
                    <div className="card-header">
                      <div className="header-transactions">
                        <h3 className="card-title">Transações</h3>
                        <div>
                          <input
                            id="inputCodeRemoveTransaction"
                            type="text"
                            placeholder="Digite o código"
                          />
                          <button
                            className="btn btn-danger"
                            onClick={() => { }}
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="card-body p-0">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th style={{ width: '10px' }}>#</th>
                            <th>Nome</th>
                            <th>Valor</th>
                            <th>Data</th>
                            <th style={{ width: '40px' }}></th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            <>
                              {transactions.map((t: Transaction, index) => {
                                return (<tr key={index}>
                                  <td style={{ width: '10px' }}>{t.code}</td>
                                  <td>{t.name}</td>
                                  <td>{t.value}</td>
                                  <td>{t.date}</td>
                                  <td style={{ width: '40px' }}>{
                                    t.type === 'entry'
                                      ? <span className={'tagsEntry'}>ENTRADA</span>
                                      : <span className={'tagsOutput'}>SAÍDA</span>
                                  }</td>
                                </tr>)
                              })}
                            </>
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </section>
        </div>

        <footer className="main-footer">
          <strong>Copyright © 2014-2022 <a href="">Cash App - Finances</a>.</strong>
          All rights reserved.
          <div className="float-right d-none d-sm-inline-block">
            <b>Version</b> 3.2.0
          </div>
        </footer>

      </div>
    </div>
  )
}

export default App
