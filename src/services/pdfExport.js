import jsPDF from "jspdf";
import logoRingette from "../assets/logo-ringette.png";

export function creerPDF({
  sauvegarder = true,
  matchInfo,
  dureePeriode,
  evenements,
  joueuses,
  equipeLocaleData,
  equipeVisiteuseData,
  scoreLocal,
  scoreVisiteur,
}) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "legal",
  });

  const pageWidth = 216;
  const margin = 7;
  const contentWidth = pageWidth - margin * 2;
  const rowH = 4.2;

  const buts = evenements.filter((event) => event.type === "But");
  const punitions = evenements.filter((event) => event.type === "Punition");
  const tirsBarrage = evenements.filter((event) => event.type === "Tir de barrage");
  const tirsBarrageLocal = tirsBarrage.filter((event) => event.equipe === "Local" && event.reussi);
  const tirsBarrageVisiteur = tirsBarrage.filter((event) => event.equipe === "Visiteur" && event.reussi);
  const butsLocal = buts.filter((event) => event.equipe === "Local").reverse();
  const butsVisiteur = buts.filter((event) => event.equipe === "Visiteur").reverse();
  const punitionsLocal = punitions.filter((event) => event.equipe === "Local").reverse();
  const punitionsVisiteur = punitions.filter((event) => event.equipe === "Visiteur").reverse();
  const joueusesLocales = joueuses.filter((joueuse) => joueuse.equipe === matchInfo.equipeLocale && !joueuse.absente);
  const joueusesVisiteuses = joueuses.filter((joueuse) => joueuse.equipe === matchInfo.equipeVisiteuse && !joueuse.absente);
  const absentesLocales = joueuses.filter((joueuse) => joueuse.equipe === matchInfo.equipeLocale && joueuse.absente);
  const absentesVisiteuses = joueuses.filter((joueuse) => joueuse.equipe === matchInfo.equipeVisiteuse && joueuse.absente);
  const changementsGardienne = evenements.filter((event) => event.type === "Changement gardienne");
  const changementGardienneLocal = changementsGardienne.find((event) => event.equipe === "Local");
  const changementGardienneVisiteur = changementsGardienne.find((event) => event.equipe === "Visiteur");
  const chandailLocal = matchInfo.couleurLocaleChoisie === "primaire" ? equipeLocaleData?.nomCouleurPrimaire : equipeLocaleData?.nomCouleurSecondaire;
  const chandailVisiteur = matchInfo.couleurVisiteuseChoisie === "primaire" ? equipeVisiteuseData?.nomCouleurPrimaire : equipeVisiteuseData?.nomCouleurSecondaire;
  const tempsMortsLocal = evenements.filter((event) => event.type === "Temps mort" && event.equipe === "Local").length;
  const tempsMortsVisiteur = evenements.filter((event) => event.type === "Temps mort" && event.equipe === "Visiteur").length;

  function txt(value) {return String(value || "");
  }
  function lineText(text, x, y, size = 7, style = "normal") {
    doc.setFont("helvetica", style);
    doc.setFontSize(size);
    doc.text(txt(text), x, y);
  }

  function centerText(text, x, y, w, size = 7, style = "normal") {
    doc.setFont("helvetica", style);
    doc.setFontSize(size);
    doc.text(txt(text), x + w / 2, y, { align: "center" });
  }

  function box(x, y, w, h) {
    doc.rect(x, y, w, h);
  }

  function blackBar(text, y) {
    doc.setFillColor(0, 0, 0);
    doc.rect(margin, y, contentWidth, 5, "F");
    doc.setTextColor(255, 255, 255);
    centerText(text, margin, y + 3.6, contentWidth, 7, "bold");
    doc.setTextColor(0, 0, 0);
  }

  function drawHeader() {
    const y = 8;
    box(margin, y, contentWidth, 23);
    box(margin, y, 54, 23);
    doc.addImage(logoRingette,"PNG",margin + 2, 9, 18, 18
);

    const x = margin + 84;
    box(x, y, 96, 23);
    box(x, y, 20, 6);
    box(x + 20, y, 25, 6);
    box(x + 45, y, 20, 6);
    box(x + 65, y, 31, 6);
    centerText("No du", x, y + 4, 20, 6);
    centerText("Date", x + 45, y + 4, 20, 6);
    lineText(matchInfo.numeroPartie || "", x + 21, y + 4.2, 7);
    lineText(matchInfo.date || "", x + 66, y + 4.2, 7);
  
    box(x, y + 6, 35, 6);
    box(x + 35, y + 6, 30, 6);
    box(x + 65, y + 6, 31, 6);
    centerText("Categorie", x, y + 10, 35, 6);
    lineText(matchInfo.calibre || "", x + 37, y + 10.2, 7);
    centerText("Classe", x + 65, y + 10, 31, 6);

    box(x, y + 12, 35, 6);
    box(x + 35, y + 12, 30, 6);
    box(x + 65, y + 12, 31, 6);
    centerText("Ligue/Tournoi", x, y + 16, 35, 6);
    centerText("Temps", x + 65, y + 16, 31, 6);

    box(x, y + 18, 35, 5);
    box(x + 35, y + 18, 30, 5);
    box(x + 65, y + 18, 31, 5);
    centerText("Endroit/Arena", x, y + 21.5, 35, 6);
    lineText(matchInfo.arena || "", x + 37, y + 21.5, 6.5);
    lineText(`${dureePeriode} min`, x + 67, y + 21.5, 7);
  }
  const resumeLocal = {
  p1: butsLocal.filter((but) => but.periode === "1").length,
  p2: butsLocal.filter((but) => but.periode === "2").length,
  prol: butsLocal.filter((but) => but.periode === "PROL").length,
  tb: tirsBarrageLocal.length
};

resumeLocal.total =resumeLocal.p1 + resumeLocal.p2 + resumeLocal.prol + resumeLocal.tb;

const resumeVisiteur = {
  p1: butsVisiteur.filter((but) => but.periode === "1").length,
  p2: butsVisiteur.filter((but) => but.periode === "2").length,
  prol: butsVisiteur.filter((but) => but.periode === "PROL").length,
  tb: tirsBarrageVisiteur.length
};
resumeVisiteur.total =resumeVisiteur.p1 + resumeVisiteur.p2 + resumeVisiteur.prol + resumeVisiteur.tb;

 function drawTeamBlock(y, role, teamName, score, players, goals, penalties, chandail, equipeData, resume, changementGardienne, tempsMorts) {
    blackBar("SOMMAIRE - SUMMARY", y);
    y += 5;

    const x0 = margin;
    const roleW = 13;
    const playerW = 50;
    const scoreW = 31;
    const penW = contentWidth - roleW - playerW - scoreW;
    const tableH = 86;

    box(x0, y, roleW, tableH);
    centerText(role, x0, y + 6, roleW, 6, "bold");
    centerText(teamName || "", x0, y + 12, roleW, 5.5);
    centerText(`Chandail: ${chandail || "---"}`, x0, y + tableH - 4, roleW, 4.5);

    box(x0 + roleW, y, playerW, tableH);
    box(x0 + roleW, y, playerW, rowH);
    centerText("NO.", x0 + roleW, y + 3.1, 10, 6);
    centerText("NOM", x0 + roleW + 10, y + 3.1, playerW - 10, 6);
    doc.line(x0 + roleW + 10, y, x0 + roleW + 10, y + tableH);

    const playerRows = 19;
    for (let i = 0; i <= playerRows; i++) {
      const yy = y + rowH + i * rowH;
      doc.line(x0 + roleW, yy, x0 + roleW + playerW, yy);
    }
    players.slice(0, playerRows).forEach((joueuse, i) => {
      const yy = y + rowH + i * rowH + 3.1;
      centerText(joueuse.numero, x0 + roleW, yy, 10, 6);
      lineText(`${joueuse.nom}${joueuse.gardienne ? " G" : ""}${joueuse.capitaine ? " C" : ""}${joueuse.assistanteCapitaine ? " A" : ""}${joueuse.suspendue ? " SUSP." : ""}${joueuse.remplacante ? " REMPL." : ""}`, x0 + roleW + 11, yy, 5.5);
    });

    const sx = x0 + roleW + playerW;
    box(sx, y, scoreW, tableH);
    box(sx, y, scoreW, rowH);
    centerText("POINTAGE / SCORE", sx, y + 3.1, scoreW, 6, "bold");
    const scCols = [7, 7, 7, 10];
    let cx = sx;
    ["PTS.", "ASS.", "ASS.", "TEMPS"].forEach((h, i) => {
      box(cx, y + rowH, scCols[i], rowH);
      centerText(h, cx, y + rowH + 3.1, scCols[i], 5.5);
      cx += scCols[i];
    });
    for (let i = 0; i <= playerRows - 1; i++) {
      const yy = y + rowH * 2 + i * rowH;
      doc.line(sx, yy, sx + scoreW, yy);
    }
    cx = sx;
    for (let i = 0; i < scCols.length - 1; i++) {
      cx += scCols[i];
      doc.line(cx, y + rowH, cx, y + tableH);
    }
    goals.slice(0, 12).forEach((goal, i) => {
      const yy = y + rowH * 2 + i * rowH + 3.1;
      centerText(goal.buteuseNumero, sx, yy, scCols[0], 5.5);
      centerText(goal.assistante1Numero || "", sx + scCols[0], yy, scCols[1], 5.5);
      centerText(goal.assistante2Numero || "", sx + scCols[0] + scCols[1], yy, scCols[2], 5.5);
      centerText(goal.tempsCorrige || "", sx + scCols[0] + scCols[1] + scCols[2], yy, scCols[3], 5.2);
    });

    const px = sx + scoreW;
    box(px, y, penW, tableH);
    box(px, y, penW, rowH);
    centerText("PUNITIONS / PENALTIES", px, y + 3.1, penW, 6, "bold");
    const penCols = [8, 18, 8, 8, 10, 14, 12, 12, penW - 90];
    const penHeads = [ "NO.", "PURGEE PAR", "MIN.", "CODE", "LETTRE", "SORTIE", "DEBUT", "FIN", "RETOUR",];
    cx = px;
    penHeads.forEach((h, i) => {
      box(cx, y + rowH, penCols[i], rowH);
      centerText(h, cx, y + rowH + 3.1, penCols[i], 5);
      cx += penCols[i];
    });
    for (let i = 0; i <= playerRows - 1; i++) {
      const yy = y + rowH * 2 + i * rowH;
      doc.line(px, yy, px + penW, yy);
    }
    cx = px;
    for (let i = 0; i < penCols.length - 1; i++) {
      cx += penCols[i];
      doc.line(cx, y + rowH, cx, y + tableH);
    }
    const lignesPunitions = penalties.flatMap((punition) => {
  const portions = punition.portions ?? [];

  if (portions.length === 0) {
    return [
      {
        joueuseNumero: punition.joueuseNumero,
        purgeeParNumero: punition.purgeeParNumero,
        duree: punition.duree,
        code: punition.code,
        tempsSortie: punition.tempsSortie,
        tempsDebut: punition.tempsDebut,
        tempsFinPrevue: punition.tempsFinPrevue,
        tempsRetour: punition.tempsRetour,
      },
    ];
  }

  return portions.map((portion) => ({
    joueuseNumero: punition.joueuseNumero,
    purgeeParNumero: punition.purgeeParNumero,

    duree: portion.duree,
    code: portion.code,

    tempsSortie:
      portion.tempsSortie ??
      portion.tempsDebut ??
      "",

    tempsDebut: portion.tempsDebut ?? "",

    tempsFinPrevue:
      portion.tempsFinPrevue ?? "",

    tempsRetour:
      portion.tempsRetour ?? "",
  }));
});

lignesPunitions
  .slice(0, 12)
  .forEach((ligne, i) => {
    const yy =
      y + rowH * 2 + i * rowH + 3.1;

    let x = px;

    const vals = [
      ligne.joueuseNumero,
      ligne.purgeeParNumero || "",
      ligne.duree,
      ligne.code || "",
      "",
      ligne.tempsSortie || "",
      ligne.tempsDebut || "",
      ligne.tempsFinPrevue || "",
      ligne.tempsRetour || "",
    ];

    vals.forEach((valeur, idx) => {
      if (idx === 1) {
        lineText(
          valeur || "",
          x + 1,
          yy,
          4.5
        );
      } else {
        centerText(
          valeur || "",
          x,
          yy,
          penCols[idx],
          5
        );
      }

      x += penCols[idx];
    });
  });

    const footY = y + tableH;

box(x0, footY, 52, 8);
centerText("ENTRAINEUR / COACH", x0, footY + 2.8, 52, 5.2);
lineText(equipeData?.entraineurChef || "", x0 + 2, footY + 6.4, 5.2);

box(x0 + 52, footY, 32, 8);

const resumeX = x0 + 52;
const resumeW = 32;
const colW = resumeW / 4;

centerText("RESUME / SUMMARY", resumeX, footY + 2, resumeW, 5, "bold");

doc.line(resumeX, footY + 3, resumeX + resumeW, footY + 3);

centerText("1re/1st", resumeX, footY + 5, colW, 4.2);
centerText("2e/2nd", resumeX + colW, footY + 5, colW, 4.2);
centerText("P/O", resumeX + colW * 2, footY + 5, colW, 4.2);
centerText("T.B./S.O.", resumeX + colW * 3, footY + 5, colW, 4.2);

centerText(String(resume.p1), resumeX, footY + 7.4, colW, 4.5, "bold");
centerText(String(resume.p2), resumeX + colW, footY + 7.4, colW, 4.5, "bold");
centerText(String(resume.prol), resumeX + colW * 2, footY + 7.4, colW, 4.5, "bold");
centerText(String(resume.total), resumeX + colW * 3, footY + 7.4, colW, 4.5, "bold");

doc.line(resumeX + colW, footY + 3, resumeX + colW, footY + 8);
doc.line(resumeX + colW * 2, footY + 3, resumeX + colW * 2, footY + 8);
doc.line(resumeX + colW * 3, footY + 3, resumeX + colW * 3, footY + 8);

box(x0 + 84, footY, 58, 8);
centerText("CHANGEMENT DE GARDIENNE", x0 + 84, footY + 3.2, 58, 5.5);
centerText("GOALKEEPER CHANGE", x0 + 84, footY + 6.2, 58, 5.2);

const goalieX = x0 + 142;
const goalieW = contentWidth - 142;
const goalieColW = goalieW / 2;

box(goalieX, footY, goalieW, 8);
doc.line(goalieX + goalieColW, footY, goalieX + goalieColW, footY + 8);

centerText("PERIODE / PERIOD", goalieX, footY + 2.8, goalieColW, 4.5);
centerText("TEMPS / TIME", goalieX + goalieColW, footY + 2.8, goalieColW, 4.5);

if (changementGardienne) {
  centerText(
    String(changementGardienne.periode || ""),
    goalieX,
    footY + 6.6,
    goalieColW,
    5.5,
    "bold"
  );

  centerText(
    changementGardienne.tempsCorrige || "",
    goalieX + goalieColW,
    footY + 6.6,
    goalieColW,
    5.5,
    "bold"
  );
}
const footY2 = footY + 8;

box(x0, footY2, 42, 8);
centerText("ASSISTANT 1", x0, footY2 + 2.8, 42, 5);
lineText(equipeData?.assistant1 || "", x0 + 2, footY2 + 6.3, 5);

box(x0 + 42, footY2, 42, 8);
centerText("ASSISTANT 2", x0 + 42, footY2 + 2.8, 42, 5);
lineText(equipeData?.assistant2 || "", x0 + 44, footY2 + 6.3, 5);

box(x0 + 84, footY2, 36, 8);
centerText("GERANTE", x0 + 84, footY2 + 2.8, 36, 5);
lineText(equipeData?.gerante || "", x0 + 86, footY2 + 6.3, 5);

box(x0 + 120, footY2, 42, 8);
centerText("TEMPS D'ARRET", x0 + 120, footY2 + 3.2, 42, 5.2);
centerText("TIME OUT", x0 + 120, footY2 + 6.2, 42, 5);
centerText(String(tempsMorts || ""), x0 + 135, footY2 + 5, 42, 5.5, "bold");

box(x0 + 162, footY2, contentWidth - 162, 8);

return footY2 + 8;
  }

  function drawPenaltyCodes(y) {
    box(margin, y, contentWidth, 36);
    doc.line(margin + contentWidth * 0.55, y, margin + contentWidth * 0.55, y + 36);
    lineText("PUNITIONS - 2 MIN. - PENALTIES (1-13)", margin + 1, y + 4, 6.5, "bold");
    const left = [
      "1. ACCROCHER / HOOKING",
      "2. ASSAUT / CHARGE",
      "3. BATON ELEVE / HIGH STICKING",
      "4. CINGLER / SLASHING",
      "5. DONNER DU COUDE / ELBOWING",
      "6. DOUBLE ECHEC / CROSS CHECKING",
      "7. FAIRE TREBUCHER / TRIPPING",
      "8. MISE EN ECHEC / BODY CONTACT",
      "9. OBSTRUCTION / INTERFERENCE",
      "10. PLAQUAGE CONTRE LA BANDE / BOARDING",
      "11. RETARDER LA PARTIE / DELAY OF GAME",
      "12. RETENUE / HOLDING",
      "13. SUBSTITUTION ILLEGALE / ILLEGAL SUBSTITUTION",
    ];
    left.forEach((item, i) => lineText(item, margin + 1 + (i > 8 ? 54 : 0), y + 8 + (i % 9) * 3, 5.2));

    const rx = margin + contentWidth * 0.55 + 1;
    lineText("PUNITIONS A PURGER ENTIEREMENT / FULLY SERVED PENALTIES", rx, y + 4, 6.2, "bold");
    const right = [
      "14. CONDUITE NON SPORTIVE / UNSPORTSMANLIKE CONDUCT  2 MIN.",
      "15. PENALITE MAJEURE / MAJOR PENALTY  4 MIN.",
      "16. MAUVAISE CONDUITE / MISCONDUCT  2 MIN.",
      "17. PENALITE DE MATCH / MATCH PENALTY  4 MIN.",
      "18. LANCER DE PUNITION / PENALTY SHOT",
      "19. RUDESSE / ROUGH PLAY  4 MIN.",
      "20. ATHLETE EXPULSE POUR AVOIR ACCUMULE 10 MINUTES DE PENALITE",
    ];
    right.forEach((item, i) => lineText(item, rx, y + 8 + i * 3.6, 5.2));
    return y + 36;
  }

  function drawOfficials(y) {
  box(margin, y, contentWidth, 30);

  lineText("OFFICIELS - OFFICIALS", margin + 1, y + 5, 6.5, "bold");

  const titres = [
    "OFFICIEL MAJEUR / REFEREE",
    "OFFICIEL MAJEUR / REFEREE",
    "CHRONOMETRE DE DECOMPTE / SHOTCLOCK",
    "MARQUEUR / SCORER",
    "CHRONOMETREUR / TIMEKEEPER",
  ];

  const valeurs = [
    matchInfo.arbitrePrincipal,
    matchInfo.arbitreSecondaire,
    matchInfo.operateur30s,
    matchInfo.marqueur,
    matchInfo.chronometreur,
  ];

  titres.forEach((titre, i) => {
    const yy = y + 10 + i * 4;

    lineText(titre, margin + 2, yy, 5.5);
    doc.line(margin + 65, yy + 0.5, margin + 130, yy + 0.5);
    lineText(valeurs[i] || "", margin + 67, yy, 5.5);
  });

  lineText(
    "NOM (MAJUSCULES) - NAME (PRINT CONFIRMATION)",
    margin + 132,
    y + 10,
    5
  );
}

  drawHeader();
  let y = 34;
 y = drawTeamBlock(
  y,
  "VISITEUR",
  matchInfo.equipeVisiteuse,
  scoreVisiteur,
  joueusesVisiteuses,
  butsVisiteur,
  punitionsVisiteur,
  chandailVisiteur,
  equipeVisiteuseData,
  resumeVisiteur,
  changementGardienneVisiteur,
  tempsMortsVisiteur
);
  y = drawPenaltyCodes(y + 2);
  y = drawTeamBlock(
  y + 2,
  "LOCAL",
  matchInfo.equipeLocale,
  scoreLocal,
  joueusesLocales,
  butsLocal,
  punitionsLocal,
  chandailLocal,
  equipeLocaleData,
  resumeLocal,
  changementGardienneLocal,
  tempsMortsLocal
);
  drawOfficials(y + 3);

  const absentes = [...absentesVisiteuses, ...absentesLocales];
  if (absentes.length > 0) {
    doc.setFontSize(6);
    const texteAbsentes = absentes
      .map((joueuse) => `#${joueuse.numero} ${joueuse.nom} (${joueuse.equipe})`)
      .join(", ");
    lineText(`Absentes: ${texteAbsentes}`, margin, 344, 5.5);
  }

  const nomFichier = `Feuille_match_${matchInfo.numeroPartie || "partie"}_${
    matchInfo.equipeLocale || "local"
  }_vs_${matchInfo.equipeVisiteuse || "visiteur"}.pdf`
    .replaceAll(" ", "_")
    .replaceAll("/", "-");

  if (sauvegarder) {
  doc.save(nomFichier);
}

return {
  doc,
  nomFichier,
};
}