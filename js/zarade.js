const kalkulatorInputs = [
      { id: `netoZarada`, value: 0 },
      { id: `porez`, value: 0 },
      { id: `doprinosZaPio1`, value: 0 },
      { id: `doprinosZaZdravstvo1`, value: 0 },
      { id: `doprinosZaNezaposlenost`, value: 0 },
      { id: `poreziDoprinosi`, value: 0 },
      { id: `bruto1`, value: 0 },
      { id: `doprinosZaPio2`, value: 0 },
      { id: `doprinosZaZdravstvo2`, value: 0 },
      { id: `doprinosiNaZarade`, value: 0 },
      { id: `bruto2`, value: 0 },
      { id: `subvencije65`, value: 0 },
      { id: `trosakPoslodavca65`, value: 0 },
      { id: `subvencije75`, value: 0 },
      { id: `trosakPoslodavca75`, value: 0 },
      { id: `totalPorez`, value: 0}
    ]
    
    // ===== CONST
    const brutoProcenat = 0.478
    const doprinosiProcenat = 0.299
    const zaradeNezaposlenost = 0
    const zaradeProcenat = 0.179
    const poreskaStopa = 0.1
    const pio = 0.14
    const zdravstvo = 0.0515
    const nezaposlenost = 0.0075
    const zaradePio = 0.115
    const zaradeZdravstvo = 0.0515
    const neoporezivi = 18300
    const najnizaOsnovica = 25801
    const najvisaOsnovica = 368590
    const netoMin = (najnizaOsnovica - ((najnizaOsnovica - neoporezivi) * poreskaStopa) - (najnizaOsnovica * pio) - (najnizaOsnovica * zdravstvo) - (najnizaOsnovica * nezaposlenost))
    const netoMax = (najvisaOsnovica - ((najvisaOsnovica - neoporezivi) * poreskaStopa) - (najvisaOsnovica * pio) - (najvisaOsnovica * zdravstvo) - (najvisaOsnovica * nezaposlenost))
    const doprinosiMin = najnizaOsnovica * (zaradePio + zaradeZdravstvo)
    const doprinosiMax = najvisaOsnovica * (zaradePio + zaradeZdravstvo)
    const bruto2Min = najnizaOsnovica + (najnizaOsnovica * zaradePio) + (najnizaOsnovica * zaradeZdravstvo)
    const bruto2Max = najvisaOsnovica + (najvisaOsnovica * zaradePio) + (najvisaOsnovica * zaradeZdravstvo)
    
    // ==== VARIJABLE
    let netoZarada = 0
    let porez = 0
    let doprinosZaPio1 = 0
    let doprinosZaZdravstvo1 = 0
    let doprinosZaNezaposlenost = 0
    let poreziDoprinosi = 0
    let bruto1 = 0
    let doprinosZaPio2 = 0
    let doprinosZaZdravstvo2 = 0
    let doprinosiNaZarade = 0
    let bruto2 = 0
    let subvencije65 = 0
    let trosakPoslodavca65 = 0
    let subvencije75 = 0
    let trosakPoslodavca75 = 0
    let totalPorez = 0
    
    for (let input of kalkulatorInputs) {
      let renderedInput = document.getElementById(input.id)
      renderedInput.addEventListener(`click`, () => handleClick(renderedInput))
      renderedInput.addEventListener(`change`, () => handleChange(renderedInput))
    }
    
    function handleClick(input) {
      if (input.id === `netoZarada` || input.id === `bruto1` || input.id === `bruto2`) {
          for (let calcInput of kalkulatorInputs) {
              calcInput.value = 0
              renderInputValues()
          }
      }
    }
    
    function handleChange(input) {
      switch(input.id) {
          case `netoZarada`:
              netoZarada = parseInt(input.value)
              if (netoZarada < netoMin) {
                  bruto1 = ((netoZarada - (neoporezivi * poreskaStopa)) + (najnizaOsnovica * (pio + zdravstvo + nezaposlenost))) / (1 - poreskaStopa)
              } else if (netoZarada > netoMax) {
                  bruto1 = ((netoZarada - (neoporezivi * poreskaStopa)) + (najvisaOsnovica * (pio + zdravstvo + nezaposlenost))) / (1 - poreskaStopa)
              } else {
                  bruto1 = (netoZarada - (neoporezivi * poreskaStopa)) / (1 - (poreskaStopa + pio + zdravstvo + nezaposlenost))
              }            
              calculateContributions()
              bruto2 = bruto1 + doprinosiNaZarade
              break;
          case `bruto1`:
              bruto1 = parseInt(input.value)
              calculateContributions()            
              netoZarada = bruto1 - poreziDoprinosi            
              bruto2 = bruto1 + doprinosiNaZarade
              break;
          case `bruto2`:
              bruto2 = parseInt(input.value)            
              let procenatZaMin = ((doprinosiMin * 100) / (bruto2 - doprinosiMin))
              let procenatZaMax = ((doprinosiMax * 100) / (bruto2 - doprinosiMax))
              if (bruto2 < bruto2Min) {
                  bruto1 = bruto2 - ((bruto2 * procenatZaMin) / (100 + procenatZaMin))             
              } else if (bruto2 > bruto2Max) {
                  bruto1 = bruto2 - ((bruto2 * procenatZaMax) / (100 + procenatZaMax))
              } else {
                  bruto1 = bruto2 / (1 + zaradePio + zaradeZdravstvo)
              }            
              calculateContributions()            
              netoZarada = bruto1 - poreziDoprinosi            
              break;
      }
      subvencije65 = (bruto2 - netoZarada) * 0.65
      trosakPoslodavca65 = bruto2 - subvencije65
      subvencije75 = (bruto2 - netoZarada) * 0.75
      trosakPoslodavca75 = bruto2 - subvencije75
      updateKalkulatorInputValues()
    }
    
    function calculateContributions() {
      if (bruto1 < najnizaOsnovica) {
          doprinosZaPio1 = najnizaOsnovica * pio
          doprinosZaZdravstvo1 = najnizaOsnovica * zdravstvo
          doprinosZaNezaposlenost = najnizaOsnovica * nezaposlenost
          doprinosZaPio2 = najnizaOsnovica * zaradePio
          doprinosZaZdravstvo2 = najnizaOsnovica * zaradeZdravstvo
      } else if (bruto1 > najvisaOsnovica) {
          doprinosZaPio1 = najvisaOsnovica * pio
          doprinosZaZdravstvo1 = najvisaOsnovica * zdravstvo
          doprinosZaNezaposlenost = najvisaOsnovica * nezaposlenost
          doprinosZaPio2 = najvisaOsnovica * zaradePio
          doprinosZaZdravstvo2 = najvisaOsnovica * zaradeZdravstvo
      } else {
          doprinosZaPio1 = bruto1 * pio
          doprinosZaZdravstvo1 = bruto1 * zdravstvo
          doprinosZaNezaposlenost = bruto1 * nezaposlenost
          doprinosZaPio2 = bruto1 * zaradePio
          doprinosZaZdravstvo2 = bruto1 * zaradeZdravstvo
      }
    porez = (bruto1 - neoporezivi) * poreskaStopa
      poreziDoprinosi = porez + doprinosZaPio1 + doprinosZaZdravstvo1 + doprinosZaNezaposlenost
      doprinosiNaZarade = doprinosZaPio2 + doprinosZaZdravstvo2
      totalPorez = porez + doprinosZaPio1 + doprinosZaZdravstvo1 + doprinosZaNezaposlenost + doprinosZaPio2 + doprinosZaZdravstvo2
    }
    
    // UPD INPUT VALUES

    function updateKalkulatorInputValues() {
      kalkulatorInputs[0].value = netoZarada
      kalkulatorInputs[1].value = porez
      kalkulatorInputs[2].value = doprinosZaPio1
      kalkulatorInputs[3].value = doprinosZaZdravstvo1
      kalkulatorInputs[4].value = doprinosZaNezaposlenost
      kalkulatorInputs[5].value = poreziDoprinosi
      kalkulatorInputs[6].value = bruto1
      kalkulatorInputs[7].value = doprinosZaPio2
      kalkulatorInputs[8].value = doprinosZaZdravstvo2
      kalkulatorInputs[9].value = doprinosiNaZarade
      kalkulatorInputs[10].value = bruto2
      kalkulatorInputs[11].value = subvencije65
      kalkulatorInputs[12].value = trosakPoslodavca65
      kalkulatorInputs[13].value = subvencije75
      kalkulatorInputs[14].value = trosakPoslodavca75
      kalkulatorInputs[15].value = totalPorez
      renderInputValues()
    }
    
    function renderInputValues() {
      for (let input of kalkulatorInputs) {
          input.value === 0 ? document.getElementById(input.id).value = `` : document.getElementById(input.id).value = formatNumber(Math.round(input.value))
      }
    }
    //  ======= FORMATIRANJE BR ========
    function formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ` din.`
    }