/**
 * How certification and examinations work, at the end of the ISO area's programmes: a small heading
 * under one hairline, then what a programme includes (certification preparation, with the examination
 * arrangements confirmed for each engagement) at the body size, then, a step smaller, the
 * standing note that a standard's name in a programme title is not an accreditation claim. Positive
 * first, the caveat once.
 */
export function CertificationNote({ className = "" }: { className?: string }) {
  return <aside aria-labelledby="certification-language" className={`border-t border-border pt-7 ${className}`}>
    <h3 id="certification-language" className="type-ui font-medium text-foreground">Certification and examinations</h3>
    <p className="mt-2 max-w-measure type-small text-copy">Programmes include certification preparation where it applies. Examination arrangements, including vouchers and the accredited body involved, are confirmed for each engagement.</p>
    <p className="mt-3 max-w-measure type-ui text-copy">A programme named after a standard or framework, such as ITIL or ISO, does not by itself make TraininGenie an accredited examination institute, authorized training partner, or certification body.</p>
  </aside>;
}
