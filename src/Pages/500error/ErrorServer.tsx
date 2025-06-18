import { useTranslation } from "react-i18next";
import "./ErrorServer.scss"

export default function ErrorServer(){
      const {t}=useTranslation();
        return(
            <>
            <div className="error-content">
                <section className="error-section">
                <div className="server-terminal">
                    <pre className="code-block">
                        <span className="prompt">$</span> <span className="command">ping server<br /></span>
                        <span className="output">Error: Connection timed out<br /></span>
                        <span className="prompt">$</span> <span className="command">check logs<br /></span>
                        <span className="output">Error: Internal Server Error (500)<br /></span>
                        <span className="prompt">$</span> <span className="command">restart service<br /></span>
                        <span className="output">Error: Service unavailable</span>
                    </pre>
                </div>
                    <div className="server-error">
                        <h1>{t('ErrorServer.h1')}</h1>
                        <p>{t('ErrorServer.p1')}</p>
                        <p>{t('ErrorServer.p2')}</p>
                        <a href="index.html" className="btn-primary">{t('ErrorServer.aname')}</a>
                    </div>
                    </section>
                </div>
            </>
        )
}