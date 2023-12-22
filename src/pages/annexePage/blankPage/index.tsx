import './blankpage.style.scss'

const BlankPage = () => {
  return (
    <div className='Blank-Page'>
        <div className="content">
          <div className="pics">
            <img src="/hi.png" />
          </div>
          <span>Aucune discussion sélectionnée</span>
        </div>
    </div>
  )
}

export default BlankPage