import React from 'react'

import './DetailBeneficiaire.css';

function DetailBeneficiaire({ data, onClose, marqueCommePaye }) {

  if (Object.keys(data).length === 0) return null;

  return (
    <div className={`modal-overlay ${Object.keys(data).length === 0 ? 'hidden' : ''}`}>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>✕</button>

        <div className="modal-grid">
          <div><strong>Code ménage:</strong> {data.Code_menage}</div>
          <div><strong>Nom:</strong> {data.Nom_CM}</div>
          <div><strong>Prénom:</strong> {data.Prenom_CM || '-'}</div>
          <div><strong>CIN:</strong> {data.CIN_CM}</div>
          <div><strong>Commune:</strong> {data.Commune}</div>
          <div><strong>Fokontany:</strong> {data.Fokontany}</div>
          <div><strong>Taille ménage:</strong> {data.Taille_Menage}</div>
          <div><strong>Handicapés:</strong> {data.NBR_Personne_Handicape}</div>
          <div><strong>Montant:</strong> {data.Montant} Ar</div>
          <div><strong>Statut:</strong> {data.payer === 1 ? 'Payé' : 'Non payé'}</div>
          <div><strong>Caissier:</strong> {data.Caissier}</div>
          <div><strong>Payé le:</strong> {new Date(data.datePayement).toLocaleString()}</div>
        </div>

        <div className="modal-images">
          <div>
            <p>Carte d'identité (Recto)</p>
            <img src={data.Recto_CIN_URL} alt="Recto CIN" />
          </div>
          <div>
            <p>Carte d'identité (Verso)</p>
            <img src={data.Verso_CIN_URL} alt="Verso CIN" />
          </div>
        </div>
        {data.payer === 0 && <button onClick={()=>marqueCommePaye(data.Code_menage)}>
            Marquer comme paye
        </button> }
      </div>
    </div>
  );
}

export default DetailBeneficiaire
