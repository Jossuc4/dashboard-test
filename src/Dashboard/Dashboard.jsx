import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import axios from 'axios';
import Menu from '../components/Menu'

function Dashboard() {
  const [filterStatus, setFilterStatus] = useState('Tous');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [beneficiairesData,setBeneficiairesData] = useState([])



  const itemsPerPage = 10;

  useEffect(() => {
    axios.get("https://association-fanambina.site/api/beneficier/").then((res) => {
      setBeneficiairesData(res.data);
      setFilteredData(res.data);
    });
  }, []);


  useEffect(() => {
    if (filterStatus === 'Tous') {
      setFilteredData(beneficiairesData);
    } else {
      const filtered = beneficiairesData.filter(b =>
        filterStatus === 'Payé' ? b.payer === 1 : b.payer === 0
      );
      setFilteredData(filtered);
    }
  
    setCurrentPage(1);
  }, [filterStatus, beneficiairesData]);
  

  const handleExport = (type) => {
    const exportData = beneficiairesData.filter(b =>
      type === 'Presents' ? b.status === 'Payé' : b.status === 'Non payé'
    );

    const csv = exportData.map(b => `${b.id},${b.name},${b.status}`).join('\n');
    const blob = new Blob([`ID,Nom,Statut\n${csv}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `Beneficiaires_${type}.csv`;
    a.click();
  };

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="dashboardPage">
    <Menu/>
    <div className="dashboard">
      <div className="recap">
        <p><strong>Bénéficiaires à Payer:</strong> {beneficiairesData.filter((b) => b.payer === 0).length}</p>
        <p><strong>Bénéficiaires Payé:</strong> {beneficiairesData.filter((b) => b.payer === 1).length}</p>
      </div>

      <div className="actions">
        <button onClick={() => handleExport('Presents')}>Exporter les bénéficiaires présents</button>
        <button onClick={() => handleExport('Absents')}>Exporter les bénéficiaires absents</button>

        <select onChange={(e) => setFilterStatus(e.target.value)} value={filterStatus}>
          <option value="Tous">Tous</option>
          <option value="Payé">Payé</option>
          <option value="Non payé">Non payé</option>
        </select>
      </div>

      <table id='beneficiaires'>
        <thead>
          <tr>
            <th>Code Ménage</th>
            <th>Nom Chef Ménage</th>
            <th>Statut</th>
          </tr>
        </thead>

        <tbody>
          {paginatedData.map(b => (
            <tr key={b.id}>
              <td>{b.Code_menage}</td>
              <td>{b.Nom_CM}</td>
              <td>
                <span className={`status-badge ${b.payer === 1 ? 'status-paid' : 'status-unpaid'}`}>
                  {b.payer === 1 ? 'Payé' : 'Non payé'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          &#9664; {/* ◀️ */}
        </button>

          {Array.from({ length: 3 }, (_, i) => {
            const page = currentPage === 1
              ? i + 1
              : currentPage === pageCount
                ? pageCount - 2 + i
                : currentPage - 1 + i;

            if (page < 1 || page > pageCount) return null;

            return (
              <button
                key={page}
                className={currentPage === page ? 'active' : ''}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
            disabled={currentPage === pageCount}
          >
            &#9654; {/* ▶️ */}
          </button>
        </div>

        </div>
        </section>
  );
}

export default Dashboard;
