import { LogoWordmark } from "@/components/logo-wordmark";
import { branches } from "@/data/locations";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <LogoWordmark />
            <p className="micro-label">Elevating Beauty Forward</p>
          </div>
          <div>
            <p className="micro-label">Clinics</p>
            <p>
              {branches.map((branch) => (
                <span key={branch.slug}>
                  {branch.shortAddress}
                  <br />
                </span>
              ))}
            </p>
          </div>
          <div>
            <p className="micro-label">Contact</p>
            <p>
              0945 234 7667
              <br />
              elledemarrer@gmail.com
            </p>
          </div>
        </div>
        <div className="site-footer__bottom">
          <span>© 2026 Elle De Marrer</span>
          <span>TikTok · Facebook · Instagram</span>
        </div>
      </div>
    </footer>
  );
}
