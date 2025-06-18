import { useTranslation } from "react-i18next"
import "./NotFound.scss"
export default function NotFoundPage(){
  const {t}=useTranslation();
    return(
        <>
             <div className="error-content">
    <section className="error-section">
      <div className="terminal">
        <pre className="code-block">
          <span className="prompt">$</span> <span className="command">cd /pages<br /></span>
          <span className="output">bash: cd: /pages: No such file or directory<br /></span>
          <span className="prompt">$</span> <span className="command">ls <br /></span>
          <span className="output">index.html <br /></span>
          <span className="prompt">$</span> <span className="command">cat 404.html <br /></span>
          <span className="output">Error: File not found (404)</span>
        </pre>
      </div>
      <div className="error-message">
        <h1>{t('NotFound.h1')}</h1>
        <p>{t('NotFound.p')}</p>
        <a href="/" className="btn-primary">{t('NotFound.aname')}</a>
      </div>
    </section>
    </div>
        </>
    )
}