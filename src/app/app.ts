import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  computed,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export type LanguageCode = 'en' | 'es' | 'hi' | 'fr';

export interface QuadrantItem {
  key: string;
  num: number;
  label: string;
  sub: string;
  speech: string;
  urgent?: boolean;
}

export interface CategoryNode {
  id: string;
  key: string;
  num: number;
  title: string;
  subtitle: string;
  color: 'cyan' | 'rose' | 'amber' | 'emerald';
  icon: string;
  urgent?: boolean;
  borderClass: string;
  textAccent: string;
  bgGlow: string;
  children: QuadrantItem[];
}

export interface LocaleUI {
  path: string;
  broadcasting: string;
  reset: string;
  resetShort: string;
  returnHome: string;
  repeat: string;
  return: string;
  select: string;
  key: string;
}

export interface LocaleBundle {
  code: string;
  name: string;
  pathHome: string;
  ui: LocaleUI;
  categories: CategoryNode[];
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [MatIconModule, DatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
  host: {
    '(window:keydown)': 'handleKeyDown($event)',
    class: 'block h-full w-full',
  },
})
export class App implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  readonly isBrowser = isPlatformBrowser(this.platformId);

  // Active Language State
  readonly currentLang = signal<LanguageCode>('en');

  // Multilingual tree definitions
  private readonly locales: Record<LanguageCode, LocaleBundle> = {
    en: {
      code: 'en-US',
      name: 'English',
      pathHome: 'Home',
      ui: {
        path: 'PATH:',
        broadcasting: 'Broadcasting...',
        reset: 'RESET [ESC]',
        resetShort: 'RESET',
        returnHome: 'MAIN MENU',
        repeat: 'REPEAT AUDIO [SPACE / R]',
        return: 'RETURN TO BOARD [ESC]',
        select: 'SELECT',
        key: 'KEY',
      },
      categories: [
        {
          id: 'help',
          key: '01',
          num: 1,
          title: 'I NEED HELP',
          subtitle: 'Nurse • Family • Water • Bathroom',
          color: 'cyan',
          icon: 'medical_services',
          borderClass: 'border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]',
          textAccent: 'text-cyan-400',
          bgGlow: 'bg-cyan-500/5',
          children: [
            { key: '01', num: 1, label: 'Nurse / Caregiver', sub: 'Assistance at bedside', speech: 'Patient Alert! ... Nurse or caregiver requested at bedside. ... Please assist.' },
            { key: '02', num: 2, label: 'Family / Doctor', sub: 'Contact physician or kin', speech: 'Patient Alert! ... Please contact my family or call the attending doctor.' },
            { key: '03', num: 3, label: 'Water / Ice', sub: 'Drink or ice chips request', speech: 'Patient Request. ... I need fresh water or ice chips, please.' },
            { key: '04', num: 4, label: 'Bathroom', sub: 'Restroom or bedpan help', speech: 'Patient Assistance Needed. ... I require immediate bathroom assistance.' },
          ],
        },
        {
          id: 'pain',
          key: '02',
          num: 2,
          title: 'PAIN / DISCOMFORT',
          subtitle: 'Chest • Head • Stomach • Limbs',
          color: 'rose',
          icon: 'warning',
          borderClass: 'border-rose-500/40 hover:border-rose-400 hover:shadow-[0_0_30px_rgba(244,63,94,0.25)]',
          textAccent: 'text-rose-400',
          bgGlow: 'bg-rose-500/5',
          children: [
            { key: '01', num: 1, label: 'Chest & Breathing Pain', sub: 'Thoracic or lung pressure', speech: 'Urgent Medical Alert! ... Severe chest and breathing pain reported. ... Immediate evaluation required.', urgent: true },
            { key: '02', num: 2, label: 'Severe Head Pain', sub: 'Acute migraine or vertigo', speech: 'Medical Alert. ... Severe head pain and acute dizziness reported.' },
            { key: '03', num: 3, label: 'Stomach Pain', sub: 'Acute abdominal distress', speech: 'Medical Alert. ... Intense abdomen and stomach pain reported.' },
            { key: '04', num: 4, label: 'Limb / Back Pain', sub: 'Musculoskeletal pain', speech: 'Medical Alert. ... Severe acute pain in limbs or back reported.' },
          ],
        },
        {
          id: 'env',
          key: '03',
          num: 3,
          title: 'ENVIRONMENT',
          subtitle: 'Temperature • Noise • Lighting • Bed',
          color: 'amber',
          icon: 'tune',
          borderClass: 'border-amber-500/40 hover:border-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]',
          textAccent: 'text-amber-400',
          bgGlow: 'bg-amber-500/5',
          children: [
            { key: '01', num: 1, label: 'Too Hot / Too Cold', sub: 'Thermostat or blankets', speech: 'Comfort Adjustment Request. ... The room is too hot or too cold. ... Please adjust temperature.' },
            { key: '02', num: 2, label: 'Too Loud / Noise', sub: 'Hallway or monitor sound', speech: 'Comfort Adjustment Request. ... Environment is too loud. ... Noise reduction requested.' },
            { key: '03', num: 3, label: 'Turn Off Lights', sub: 'Dim ambient illumination', speech: 'Comfort Adjustment Request. ... Please turn off or dim room lighting.' },
            { key: '04', num: 4, label: 'Adjust Bed Position', sub: 'Head or foot elevation', speech: 'Bed Adjustment Request. ... Please reposition the patient bed.' },
          ],
        },
        {
          id: 'emergency',
          key: '04',
          num: 4,
          title: 'CRITICAL EMERGENCY',
          subtitle: 'Breathing • Choking • Nausea • Fainting',
          color: 'emerald',
          icon: 'crisis_alert',
          urgent: true,
          borderClass: 'border-emerald-500/50 hover:border-emerald-400 hover:shadow-[0_0_35px_rgba(16,185,129,0.35)]',
          textAccent: 'text-emerald-400',
          bgGlow: 'bg-emerald-500/5',
          children: [
            { key: '01', num: 1, label: 'CANNOT BREATHE!', sub: 'Acute respiratory distress', speech: 'CRITICAL EMERGENCY! ... PATIENT CANNOT BREATHE! ... CODE ASSIST NEEDED IMMEDIATELY!', urgent: true },
            { key: '02', num: 2, label: 'SUFFOCATING / CHOKING!', sub: 'Airway obstruction', speech: 'CRITICAL EMERGENCY! ... AIRWAY OBSTRUCTION! ... SUFFOCATING OR CHOKING! ... RESPOND NOW!', urgent: true },
            { key: '03', num: 3, label: 'SEVERE NAUSEA', sub: 'Aspiration risk warning', speech: 'CRITICAL ALERT! ... Severe acute nausea and vomiting! ... Aspiration risk, assist immediately!', urgent: true },
            { key: '04', num: 4, label: 'FEELING FAINT / PASSING OUT', sub: 'Syncope or collapse imminent', speech: 'CRITICAL ALERT! ... Imminent loss of consciousness! ... Patient feeling faint and passing out!', urgent: true },
          ],
        },
      ],
    },
    es: {
      code: 'es-ES',
      name: 'Español',
      pathHome: 'Inicio',
      ui: {
        path: 'RUTA:',
        broadcasting: 'Transmitiendo...',
        reset: 'REINICIAR [ESC]',
        resetShort: 'REINICIO',
        returnHome: 'INICIO',
        repeat: 'REPETIR AUDIO [ESPACIO / R]',
        return: 'VOLVER AL TABLERO [ESC]',
        select: 'ELEGIR',
        key: 'TECLA',
      },
      categories: [
        {
          id: 'help',
          key: '01',
          num: 1,
          title: 'NECESITO AYUDA',
          subtitle: 'Enfermera • Familia • Agua • Baño',
          color: 'cyan',
          icon: 'medical_services',
          borderClass: 'border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]',
          textAccent: 'text-cyan-400',
          bgGlow: 'bg-cyan-500/5',
          children: [
            { key: '01', num: 1, label: 'Enfermera / Cuidador', sub: 'Asistencia en cama', speech: '¡Alerta de paciente! ... Se solicita enfermera o cuidador en la cama. ... Por favor asista.' },
            { key: '02', num: 2, label: 'Familia / Médico', sub: 'Contactar médico o pariente', speech: '¡Alerta de paciente! ... Por favor contacte a mi familia o llame al médico tratante.' },
            { key: '03', num: 3, label: 'Agua / Hielo', sub: 'Petición de bebida o hielo', speech: 'Solicitud de paciente. ... Necesito agua fresca o hielo, por favor.' },
            { key: '04', num: 4, label: 'Baño', sub: 'Ayuda para el sanitario', speech: 'Asistencia de paciente. ... Necesito ayuda inmediata para ir al baño.' },
          ],
        },
        {
          id: 'pain',
          key: '02',
          num: 2,
          title: 'DOLOR / MALESTAR',
          subtitle: 'Pecho • Cabeza • Estómago • Extremidades',
          color: 'rose',
          icon: 'warning',
          borderClass: 'border-rose-500/40 hover:border-rose-400 hover:shadow-[0_0_30px_rgba(244,63,94,0.25)]',
          textAccent: 'text-rose-400',
          bgGlow: 'bg-rose-500/5',
          children: [
            { key: '01', num: 1, label: 'Dolor en Pecho y Respiración', sub: 'Presión torácica o pulmonar', speech: '¡Alerta médica urgente! ... Dolor severo en el pecho y al respirar. ... Evaluación inmediata requerida.', urgent: true },
            { key: '02', num: 2, label: 'Dolor de Cabeza Severo', sub: 'Migraña aguda o vértigo', speech: 'Alerta médica. ... Dolor de cabeza severo y mareo agudo reportado.' },
            { key: '03', num: 3, label: 'Dolor de Estómago', sub: 'Dolor abdominal agudo', speech: 'Alerta médica. ... Dolor intenso en el abdomen y estómago reportado.' },
            { key: '04', num: 4, label: 'Extremidades / Espalda', sub: 'Dolor muscular o espinal', speech: 'Alerta médica. ... Dolor severo en brazos, piernas o espalda.' },
          ],
        },
        {
          id: 'env',
          key: '03',
          num: 3,
          title: 'ENTORNO',
          subtitle: 'Temperatura • Ruido • Iluminación • Cama',
          color: 'amber',
          icon: 'tune',
          borderClass: 'border-amber-500/40 hover:border-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]',
          textAccent: 'text-amber-400',
          bgGlow: 'bg-amber-500/5',
          children: [
            { key: '01', num: 1, label: 'Mucho Calor / Frío', sub: 'Termostato o sábanas', speech: 'Solicitud de confort. ... La habitación está muy caliente o fría. ... Ajuste la temperatura.' },
            { key: '02', num: 2, label: 'Mucho Ruido', sub: 'Ruido de pasillo o monitores', speech: 'Solicitud de confort. ... El entorno es muy ruidoso. ... Se solicita reducción de ruido.' },
            { key: '03', num: 3, label: 'Apagar Luces', sub: 'Atenuar iluminación', speech: 'Solicitud de confort. ... Por favor apague o atenúe las luces de la habitación.' },
            { key: '04', num: 4, label: 'Ajustar Cama', sub: 'Elevar cabeza o pies', speech: 'Solicitud de cama. ... Por favor ajuste la posición de la cama del paciente.' },
          ],
        },
        {
          id: 'emergency',
          key: '04',
          num: 4,
          title: 'EMERGENCIA CRÍTICA',
          subtitle: 'Respiración • Asfixia • Náuseas • Desmayo',
          color: 'emerald',
          icon: 'crisis_alert',
          urgent: true,
          borderClass: 'border-emerald-500/50 hover:border-emerald-400 hover:shadow-[0_0_35px_rgba(16,185,129,0.35)]',
          textAccent: 'text-emerald-400',
          bgGlow: 'bg-emerald-500/5',
          children: [
            { key: '01', num: 1, label: '¡NO PUEDO RESPIRAR!', sub: 'Dificultad respiratoria aguda', speech: '¡EMERGENCIA CRÍTICA! ... ¡EL PACIENTE NO PUEDE RESPIRAR! ... ¡CÓDIGO DE ASISTENCIA INMEDIATO!', urgent: true },
            { key: '02', num: 2, label: '¡ASFIXIA / ATRAGANTAMIENTO!', sub: 'Obstrucción de vía aérea', speech: '¡EMERGENCIA CRÍTICA! ... ¡OBSTRUCCIÓN DE VÍAS AÉREAS! ... ¡RESPONDA DE INMEDIATO!', urgent: true },
            { key: '03', num: 3, label: 'NÁUSEA SEVERA', sub: 'Riesgo de broncoaspiración', speech: '¡ALERTA CRÍTICA! ... ¡Náuseas y vómitos severos! ... ¡Riesgo de aspiración, asista ya!', urgent: true },
            { key: '04', num: 4, label: 'DESMAYO INMINENTE', sub: 'Síncope o pérdida de consciencia', speech: '¡ALERTA CRÍTICA! ... ¡Pérdida de conciencia inminente! ... ¡El paciente se siente desmayar!', urgent: true },
          ],
        },
      ],
    },
    hi: {
      code: 'hi-IN',
      name: 'हिन्दी',
      pathHome: 'होम',
      ui: {
        path: 'मार्ग:',
        broadcasting: 'प्रसारित हो रहा है...',
        reset: 'रीसेट [ESC]',
        resetShort: 'रीसेट',
        returnHome: 'मुख्य',
        repeat: 'ऑडियो दोहराएं [SPACE / R]',
        return: 'बोर्ड पर लौटें [ESC]',
        select: 'चुनें',
        key: 'कुंजी',
      },
      categories: [
        {
          id: 'help',
          key: '01',
          num: 1,
          title: 'मुझे मदद चाहिए',
          subtitle: 'नर्स • परिवार • पानी • शौचालय',
          color: 'cyan',
          icon: 'medical_services',
          borderClass: 'border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]',
          textAccent: 'text-cyan-400',
          bgGlow: 'bg-cyan-500/5',
          children: [
            { key: '01', num: 1, label: 'नर्स / देखभालकर्ता', sub: 'बिस्तर पर तुरंत सहायता', speech: 'मरीज़ अलर्ट! ... नर्स या देखभालकर्ता की बिस्तर पर तुरंत आवश्यकता है। ... कृपया मदद करें।' },
            { key: '02', num: 2, label: 'परिवार / डॉक्टर', sub: 'डॉक्टर या परिजन को बुलाएं', speech: 'मरीज़ अलर्ट! ... कृपया मेरे परिवार या डॉक्टर को तुरंत सूचित करें।' },
            { key: '03', num: 3, label: 'पानी / बर्फ', sub: 'पानी या बर्फ का अनुरोध', speech: 'मरीज़ अनुरोध। ... मुझे पीने का पानी या बर्फ चाहिए, कृपया।' },
            { key: '04', num: 4, label: 'शौचालय', sub: 'शौचालय जाने में मदद', speech: 'सहायता आवश्यक। ... मुझे शौचालय के लिए तुरंत मदद चाहिए।' },
          ],
        },
        {
          id: 'pain',
          key: '02',
          num: 2,
          title: 'दर्द / बेचैनी',
          subtitle: 'छाती • सिर • पेट • हाथ-पैर',
          color: 'rose',
          icon: 'warning',
          borderClass: 'border-rose-500/40 hover:border-rose-400 hover:shadow-[0_0_30px_rgba(244,63,94,0.25)]',
          textAccent: 'text-rose-400',
          bgGlow: 'bg-rose-500/5',
          children: [
            { key: '01', num: 1, label: 'छाती और सांस में दर्द', sub: 'छाती या फेफड़ों में दबाव', speech: 'आपातकालीन चिकित्सा अलर्ट! ... छाती और सांस लेने में गंभीर दर्द है। ... तुरंत जांच करें।', urgent: true },
            { key: '02', num: 2, label: 'गंभीर सिरदर्द', sub: 'तेज सिरदर्द या चक्कर', speech: 'चिकित्सा अलर्ट। ... गंभीर सिरदर्द और तीव्र चक्कर आ रहे हैं।' },
            { key: '03', num: 3, label: 'पेट में दर्द', sub: 'पेट में तीव्र ऐंठन', speech: 'चिकित्सा अलर्ट। ... पेट में तीव्र दर्द हो रहा है।' },
            { key: '04', num: 4, label: 'हाथ / पैर / पीठ दर्द', sub: 'मांसपेशियों में दर्द', speech: 'चिकित्सा अलर्ट। ... हाथ, पैर या पीठ में गंभीर दर्द है।' },
          ],
        },
        {
          id: 'env',
          key: '03',
          num: 3,
          title: 'वातावरण',
          subtitle: 'तापमान • शोर • लाइट • बिस्तर',
          color: 'amber',
          icon: 'tune',
          borderClass: 'border-amber-500/40 hover:border-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]',
          textAccent: 'text-amber-400',
          bgGlow: 'bg-amber-500/5',
          children: [
            { key: '01', num: 1, label: 'अधिक गर्मी / ठंड', sub: 'कमरे का तापमान ठीक करें', speech: 'सुविधा अनुरोध। ... कमरे में बहुत गर्मी या ठंड है। ... तापमान समायोजित करें।' },
            { key: '02', num: 2, label: 'बहुत अधिक शोर', sub: 'शोर कम करने का अनुरोध', speech: 'सुविधा अनुरोध। ... बहुत शोर हो रहा है। ... शांति की आवश्यकता है।' },
            { key: '03', num: 3, label: 'लाइट बंद करें', sub: 'कमरे की रोशनी कम करें', speech: 'सुविधा अनुरोध। ... कृपया कमरे की लाइट बंद या धीमी करें।' },
            { key: '04', num: 4, label: 'बिस्तर ठीक करें', sub: 'बिस्तर की स्थिति बदलें', speech: 'बिस्तर अनुरोध। ... कृपया बिस्तर की स्थिति समायोजित करें।' },
          ],
        },
        {
          id: 'emergency',
          key: '04',
          num: 4,
          title: 'गंभीर आपातकाल',
          subtitle: 'सांस • घुटन • उल्टी • बेहोशी',
          color: 'emerald',
          icon: 'crisis_alert',
          urgent: true,
          borderClass: 'border-emerald-500/50 hover:border-emerald-400 hover:shadow-[0_0_35px_rgba(16,185,129,0.35)]',
          textAccent: 'text-emerald-400',
          bgGlow: 'bg-emerald-500/5',
          children: [
            { key: '01', num: 1, label: 'सांस नहीं आ रही!', sub: 'गंभीर श्वास संकट', speech: 'गंभीर आपातकाल! ... मरीज़ सांस नहीं ले पा रहा है! ... तुरंत आपातकालीन मदद करें!', urgent: true },
            { key: '02', num: 2, label: 'दम घुट रहा है!', sub: 'सांस नली में अवरोध', speech: 'गंभीर आपातकाल! ... श्वासनली अवरुद्ध है! ... दम घुट रहा है! ... तुरंत आएं!', urgent: true },
            { key: '03', num: 3, label: 'गंभीर उल्टी / मतली', sub: 'अचानक तीव्र मतली', speech: 'गंभीर अलर्ट! ... तीव्र मतली और उल्टी! ... तुरंत सहायता करें!', urgent: true },
            { key: '04', num: 4, label: 'बेहोशी आ रही है!', sub: 'होश खोने का खतरा', speech: 'गंभीर अलर्ट! ... मरीज़ बेहोश हो रहा है! ... तुरंत डॉक्टर बुलाएं!', urgent: true },
          ],
        },
      ],
    },
    fr: {
      code: 'fr-FR',
      name: 'Français',
      pathHome: 'Accueil',
      ui: {
        path: 'CHEMIN :',
        broadcasting: 'Diffusion...',
        reset: 'RÉINITIALISER [ESC]',
        resetShort: 'RÉINIT.',
        returnHome: 'ACCUEIL',
        repeat: "RÉPÉTER L'AUDIO [ESPACE / R]",
        return: 'RETOUR AU TABLEAU [ESC]',
        select: 'SÉLECTIONNER',
        key: 'TOUCHE',
      },
      categories: [
        {
          id: 'help',
          key: '01',
          num: 1,
          title: "J'AI BESOIN D'AIDE",
          subtitle: 'Infirmière • Famille • Eau • Toilettes',
          color: 'cyan',
          icon: 'medical_services',
          borderClass: 'border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]',
          textAccent: 'text-cyan-400',
          bgGlow: 'bg-cyan-500/5',
          children: [
            { key: '01', num: 1, label: 'Infirmière / Soignant', sub: 'Assistance au chevet', speech: "Alerte patient ! ... Présence requise d'une infirmière ou d'un soignant. ... Merci d'intervenir." },
            { key: '02', num: 2, label: 'Famille / Médecin', sub: 'Contacter proche ou médecin', speech: 'Alerte patient ! ... Veuillez contacter ma famille ou appeler le médecin référent.' },
            { key: '03', num: 3, label: 'Eau / Glaçons', sub: "Demande d'eau fraîche", speech: "Demande patient. ... J'ai besoin d'eau ou de glaçons, s'il vous plaît." },
            { key: '04', num: 4, label: 'Toilettes', sub: 'Aide urgente aux toilettes', speech: "Assistance requise. ... J'ai besoin d'aide immédiate pour aller aux toilettes." },
          ],
        },
        {
          id: 'pain',
          key: '02',
          num: 2,
          title: 'DOULEUR / INCONFORT',
          subtitle: 'Poitrine • Tête • Estomac • Membres',
          color: 'rose',
          icon: 'warning',
          borderClass: 'border-rose-500/40 hover:border-rose-400 hover:shadow-[0_0_30px_rgba(244,63,94,0.25)]',
          textAccent: 'text-rose-400',
          bgGlow: 'bg-rose-500/5',
          children: [
            { key: '01', num: 1, label: 'Douleur Poitrine & Souffle', sub: 'Pression thoracique aiguë', speech: 'Alerte médicale urgente ! ... Douleur thoracique et respiratoire aiguë. ... Examen immédiat requis.', urgent: true },
            { key: '02', num: 2, label: 'Maux de Tête Sévères', sub: 'Migraine aiguë ou vertiges', speech: 'Alerte médicale. ... Maux de tête sévères et vertiges intenses signalés.' },
            { key: '03', num: 3, label: "Douleurs d'Estomac", sub: 'Douleur abdominale vive', speech: "Alerte médicale. ... Douleurs abdominales intenses signalées à l'estomac." },
            { key: '04', num: 4, label: 'Membres / Dos', sub: 'Douleurs musculosquelettiques', speech: 'Alerte médicale. ... Douleurs aiguës aux membres ou au dos.' },
          ],
        },
        {
          id: 'env',
          key: '03',
          num: 3,
          title: 'ENVIRONNEMENT',
          subtitle: 'Température • Bruit • Éclairage • Lit',
          color: 'amber',
          icon: 'tune',
          borderClass: 'border-amber-500/40 hover:border-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]',
          textAccent: 'text-amber-400',
          bgGlow: 'bg-amber-500/5',
          children: [
            { key: '01', num: 1, label: 'Trop Chaud / Trop Froid', sub: 'Thermostat ou couverture', speech: 'Demande de confort. ... La chambre est trop chaude ou trop froide. ... Réglez la température.' },
            { key: '02', num: 2, label: 'Trop de Bruit', sub: 'Bruit de couloir ou sonnettes', speech: 'Demande de confort. ... Il y a trop de bruit. ... Réduction sonore souhaitée.' },
            { key: '03', num: 3, label: 'Éteindre les Lumières', sub: 'Tamiser éclairage ambiant', speech: "Demande de confort. ... Merci d'éteindre ou tamiser la lumière de la pièce." },
            { key: '04', num: 4, label: 'Ajuster le Lit', sub: 'Relever tête ou pieds', speech: 'Demande de lit. ... Veuillez ajuster la position du lit du patient.' },
          ],
        },
        {
          id: 'emergency',
          key: '04',
          num: 4,
          title: 'URGENCE CRITIQUE',
          subtitle: 'Respiration • Étouffement • Nausée • Malaise',
          color: 'emerald',
          icon: 'crisis_alert',
          urgent: true,
          borderClass: 'border-emerald-500/50 hover:border-emerald-400 hover:shadow-[0_0_35px_rgba(16,185,129,0.35)]',
          textAccent: 'text-emerald-400',
          bgGlow: 'bg-emerald-500/5',
          children: [
            { key: '01', num: 1, label: 'NE PEUT PLUS RESPIRER !', sub: 'Détresse respiratoire aiguë', speech: "URGENCE CRITIQUE ! ... LE PATIENT N'ARRIVE PLUS À RESPIRER ! ... INTERVENTION IMMÉDIATE !", urgent: true },
            { key: '02', num: 2, label: 'ÉTOUFFEMENT / SUFFOCATION !', sub: 'Obstruction des voies aériennes', speech: 'URGENCE CRITIQUE ! ... OBSTRUCTION RESPIRATOIRE ! ... SUFFOCATION EN COURS !', urgent: true },
            { key: '03', num: 3, label: 'NAUSÉES SÉVÈRES', sub: "Risque aigu d'inhalation", speech: "ALERTE CRITIQUE ! ... Nausées et vomissements aigus ! ... Risque d'inhalation, venez vite !", urgent: true },
            { key: '04', num: 4, label: 'PERTE DE CONNAISSANCE', sub: 'Malaise vagal ou syncope', speech: 'ALERTE CRITIQUE ! ... Malaise imminent et perte de connaissance en cours !', urgent: true },
          ],
        },
      ],
    },
  };

  // State
  readonly activeCategory = signal<CategoryNode | null>(null);
  readonly activeLeaf = signal<QuadrantItem | null>(null);
  readonly alertTimestamp = signal<Date | null>(null);

  // Persistent Clinical Orientation Clock (Date & Time for Disoriented / Long-term Patients)
  readonly currentTime = signal<Date>(new Date());
  private clockIntervalId: ReturnType<typeof setInterval> | null = null;

  // Audio & Speech State
  readonly audioUnlocked = signal<boolean>(false);
  readonly isSpeaking = signal<boolean>(false);
  readonly announcement = signal<string>('TriageTalk ready. Select quadrant 1, 2, 3, or 4.');

  private audioCtx: AudioContext | null = null;
  private speechTimeoutId: ReturnType<typeof setTimeout> | null = null;

  // Computed properties
  readonly currentLocaleBundle = computed(() => this.locales[this.currentLang()]);
  readonly currentUI = computed(() => this.currentLocaleBundle().ui);

  readonly formattedDate = computed(() => {
    const bundle = this.currentLocaleBundle();
    const now = this.currentTime();
    try {
      return new Intl.DateTimeFormat(bundle.code, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }).format(now).toUpperCase();
    } catch {
      return now.toLocaleDateString();
    }
  });

  readonly formattedTime = computed(() => {
    const bundle = this.currentLocaleBundle();
    const now = this.currentTime();
    try {
      return new Intl.DateTimeFormat(bundle.code, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(now);
    } catch {
      return now.toLocaleTimeString();
    }
  });

  readonly formattedTimeShort = computed(() => {
    const bundle = this.currentLocaleBundle();
    const now = this.currentTime();
    try {
      return new Intl.DateTimeFormat(bundle.code, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(now);
    } catch {
      return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  });

  readonly breadcrumb = computed(() => {
    const bundle = this.currentLocaleBundle();
    const leaf = this.activeLeaf();
    const cat = this.activeCategory();
    if (leaf && cat) {
      return `${bundle.pathHome} > ${cat.title} > ${leaf.label}`;
    }
    if (cat) {
      return `${bundle.pathHome} > ${cat.title}`;
    }
    return bundle.pathHome;
  });

  getCardTheme(color: 'cyan' | 'rose' | 'amber' | 'emerald') {
    switch (color) {
      case 'cyan':
        return {
          cardClass: 'border-3 sm:border-4 border-cyan-400 hover:border-cyan-300 bg-gradient-to-br from-cyan-950/85 via-slate-900/95 to-cyan-950/50 hover:from-cyan-900/90 shadow-[0_0_24px_rgba(34,211,238,0.25)] hover:shadow-[0_0_36px_rgba(34,211,238,0.45)] focus-visible:ring-cyan-400',
          numberClass: 'text-cyan-300 bg-cyan-950/90 border-2 border-cyan-400/80 shadow-[0_0_12px_rgba(34,211,238,0.3)]',
          iconClass: 'text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]',
          pillClass: 'text-cyan-200 bg-cyan-950/90 border border-cyan-400/80',
          dotClass: 'bg-cyan-400',
        };
      case 'rose':
        return {
          cardClass: 'border-3 sm:border-4 border-rose-500 hover:border-rose-400 bg-gradient-to-br from-rose-950/85 via-slate-900/95 to-rose-950/50 hover:from-rose-900/90 shadow-[0_0_24px_rgba(244,63,94,0.25)] hover:shadow-[0_0_36px_rgba(244,63,94,0.45)] focus-visible:ring-rose-400',
          numberClass: 'text-rose-300 bg-rose-950/90 border-2 border-rose-400/80 shadow-[0_0_12px_rgba(244,63,94,0.3)]',
          iconClass: 'text-rose-400 drop-shadow-[0_0_10px_rgba(244,63,94,0.5)]',
          pillClass: 'text-rose-200 bg-rose-950/90 border border-rose-400/80',
          dotClass: 'bg-rose-400',
        };
      case 'amber':
        return {
          cardClass: 'border-3 sm:border-4 border-amber-400 hover:border-amber-300 bg-gradient-to-br from-amber-950/85 via-slate-900/95 to-amber-950/50 hover:from-amber-900/90 shadow-[0_0_24px_rgba(251,191,36,0.25)] hover:shadow-[0_0_36px_rgba(251,191,36,0.45)] focus-visible:ring-amber-400',
          numberClass: 'text-amber-300 bg-amber-950/90 border-2 border-amber-400/80 shadow-[0_0_12px_rgba(251,191,36,0.3)]',
          iconClass: 'text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]',
          pillClass: 'text-amber-200 bg-amber-950/90 border border-amber-400/80',
          dotClass: 'bg-amber-400',
        };
      case 'emerald':
        return {
          cardClass: 'border-3 sm:border-4 border-emerald-400 hover:border-emerald-300 bg-gradient-to-br from-emerald-950/90 via-slate-900/95 to-emerald-950/55 hover:from-emerald-900/90 shadow-[0_0_24px_rgba(52,211,153,0.3)] hover:shadow-[0_0_40px_rgba(52,211,153,0.6)] focus-visible:ring-emerald-400',
          numberClass: 'text-emerald-300 bg-emerald-950/90 border-2 border-emerald-400/80 shadow-[0_0_12px_rgba(52,211,153,0.35)]',
          iconClass: 'text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.6)]',
          pillClass: 'text-emerald-200 bg-emerald-950/90 border border-emerald-400/80',
          dotClass: 'bg-emerald-400',
        };
    }
  }

  readonly currentCards = computed(() => {
    const cat = this.activeCategory();
    if (cat) {
      return cat.children.map((child) => {
        const theme = this.getCardTheme(cat.color);
        return {
          key: child.key,
          num: child.num,
          title: child.label,
          subtitle: child.sub,
          icon: cat.icon,
          color: cat.color,
          urgent: child.urgent ?? cat.urgent ?? false,
          theme,
          targetLeaf: child,
        };
      });
    }
    const bundle = this.currentLocaleBundle();
    return bundle.categories.map((c) => {
      const theme = this.getCardTheme(c.color);
      return {
        key: c.key,
        num: c.num,
        title: c.title,
        subtitle: c.subtitle,
        icon: c.icon,
        color: c.color,
        urgent: c.urgent ?? false,
        theme,
        targetCat: c,
      };
    });
  });

  ngOnInit(): void {
    if (this.isBrowser) {
      // 1-second clock timer for patient orientation display
      this.clockIntervalId = setInterval(() => {
        this.currentTime.set(new Date());
      }, 1000);

      if ('speechSynthesis' in window) {
        window.speechSynthesis.getVoices();
        window.speechSynthesis.onvoiceschanged = () => {
          window.speechSynthesis.getVoices();
        };
      }

      // Auto-unlock on first user interaction anywhere
      const autoUnlock = () => {
        this.unlockAudio();
        window.removeEventListener('pointerdown', autoUnlock);
        window.removeEventListener('keydown', autoUnlock);
      };
      window.addEventListener('pointerdown', autoUnlock, { passive: true });
      window.addEventListener('keydown', autoUnlock, { passive: true });
    }
  }

  ngOnDestroy(): void {
    if (this.clockIntervalId) {
      clearInterval(this.clockIntervalId);
    }
    if (this.speechTimeoutId) {
      clearTimeout(this.speechTimeoutId);
    }
    if (this.isBrowser && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (this.audioCtx) {
      try {
        this.audioCtx.close();
      } catch (err) {
        void err;
      }
    }
  }

  setLanguage(lang: LanguageCode): void {
    this.currentLang.set(lang);
    const cat = this.activeCategory();
    if (cat) {
      const bundle = this.locales[lang];
      const matchingCat = bundle.categories.find((c) => c.id === cat.id);
      this.activeCategory.set(matchingCat || null);

      const leaf = this.activeLeaf();
      if (leaf && matchingCat) {
        const matchingLeaf = matchingCat.children.find((l) => l.key === leaf.key);
        this.activeLeaf.set(matchingLeaf || null);
      }
    }
  }

  onLanguageSelectChange(event: Event): void {
    const val = (event.target as HTMLSelectElement).value as LanguageCode;
    this.setLanguage(val);
  }

  unlockAudio(): void {
    if (!this.isBrowser) return;
    const ctx = this.initAudioCtx();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch((err) => void err);
    }
    this.audioUnlocked.set(true);
  }

  private initAudioCtx(): AudioContext | null {
    if (!this.isBrowser) return null;
    if (!this.audioCtx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch((err) => void err);
    }
    return this.audioCtx;
  }

  // 2. Web Audio Crisp 2-Tone Medical Chime (Oscillator based)
  playMedicalChime(isUrgent = false): void {
    const ctx = this.initAudioCtx();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.connect(gain);
      gain.connect(ctx.destination);

      const freq1 = isUrgent ? 960 : 784; // G5 or B5
      const freq2 = isUrgent ? 1320 : 1046; // E6 or C6

      osc.frequency.setValueAtTime(freq1, now);
      osc.frequency.setValueAtTime(freq2, now + 0.1);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.setValueAtTime(0.25, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch (err) {
      void err;
    }
  }

  // 3. Human-like Speech Synthesis (`window.speechSynthesis`)
  speakPhrase(phrase: string, isUrgent = false): void {
    if (!this.isBrowser) return;

    this.unlockAudio();
    this.playMedicalChime(isUrgent);

    if (!('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();

      if (this.speechTimeoutId) {
        clearTimeout(this.speechTimeoutId);
        this.speechTimeoutId = null;
      }

      const utterance = new SpeechSynthesisUtterance(phrase);
      const bundle = this.currentLocaleBundle();
      utterance.lang = bundle.code;

      // Rate: 0.88 for standard requests and 1.0 with higher pitch for Category 4 emergencies
      utterance.rate = isUrgent ? 1.0 : 0.88;
      utterance.pitch = isUrgent ? 1.15 : 1.0;
      utterance.volume = 1.0;

      // Filter voices prioritizing 'Natural', 'Enhanced', 'Google', or 'Online'
      const voices = window.speechSynthesis.getVoices();
      const langPrefix = bundle.code.split('-')[0];
      const bestVoice =
        voices.find(
          (v) =>
            v.lang.startsWith(langPrefix) &&
            (v.name.includes('Natural') ||
              v.name.includes('Enhanced') ||
              v.name.includes('Google') ||
              v.name.includes('Online'))
        ) ||
        voices.find((v) => v.lang.startsWith(langPrefix)) ||
        voices[0];

      if (bestVoice) {
        utterance.voice = bestVoice;
      }

      this.isSpeaking.set(true);

      utterance.onstart = () => {
        this.isSpeaking.set(true);
      };

      utterance.onend = () => {
        this.isSpeaking.set(false);
      };

      utterance.onerror = () => {
        this.isSpeaking.set(false);
      };

      // 160ms pause to let the 2-tone medical chime ring cleanly before speech
      setTimeout(() => {
        if ('speechSynthesis' in window) {
          window.speechSynthesis.speak(utterance);
        }
      }, 160);

      this.speechTimeoutId = setTimeout(() => {
        this.isSpeaking.set(false);
      }, 9000);
    } catch (err) {
      void err;
      this.isSpeaking.set(false);
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    const targetTag = (event.target as HTMLElement)?.tagName?.toLowerCase();
    if (targetTag === 'input' || targetTag === 'textarea' || targetTag === 'select') {
      return;
    }

    this.unlockAudio();
    const key = event.key;

    if (key === 'Escape') {
      event.preventDefault();
      this.resetOrBack();
      return;
    }

    if (key === ' ' || key === 'Spacebar') {
      if (this.activeLeaf()) {
        event.preventDefault();
        this.repeatSpeech();
        return;
      }
    }

    if (key === 'r' || key === 'R') {
      if (this.activeLeaf()) {
        event.preventDefault();
        this.repeatSpeech();
        return;
      }
    }

    let num: number | null = null;
    if (key === '1' || key === 'Numpad1') num = 1;
    else if (key === '2' || key === 'Numpad2') num = 2;
    else if (key === '3' || key === 'Numpad3') num = 3;
    else if (key === '4' || key === 'Numpad4') num = 4;

    if (num !== null) {
      event.preventDefault();
      this.selectQuadrantByNum(num);
    }
  }

  selectQuadrantByNum(num: number): void {
    if (this.activeLeaf()) {
      this.activeLeaf.set(null);
      this.activeCategory.set(null);
    }

    const cat = this.activeCategory();
    if (!cat) {
      const bundle = this.currentLocaleBundle();
      const targetCat = bundle.categories.find((c) => c.num === num);
      if (targetCat) {
        this.selectCategory(targetCat);
      }
    } else {
      const targetLeaf = cat.children.find((child) => child.num === num);
      if (targetLeaf) {
        this.selectLeaf(targetLeaf);
      }
    }
  }

  triggerHaptic(pattern: number | number[]): void {
    if (this.isBrowser && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (err) {
        void err;
      }
    }
  }

  selectCategory(category: CategoryNode): void {
    this.unlockAudio();
    this.triggerHaptic([50, 30, 50]); // Confirmation pulse on menu navigation
    this.activeCategory.set(category);
    this.announcement.set(`Opened ${category.title}. Choose 1, 2, 3, or 4.`);
  }

  selectLeaf(item: QuadrantItem): void {
    this.activeLeaf.set(item);
    this.alertTimestamp.set(new Date());
    const isUrgent = item.urgent || this.activeCategory()?.urgent || false;

    if (isUrgent) {
      this.triggerHaptic([200, 100, 200, 100, 400]); // Heavy emergency vibration pattern
    } else {
      this.triggerHaptic(30); // Light tap feedback
    }

    this.announcement.set(`Broadcasting: ${item.speech}`);
    this.speakPhrase(item.speech, isUrgent);
  }

  repeatSpeech(): void {
    const leaf = this.activeLeaf();
    if (!leaf) return;
    this.triggerHaptic(30);
    const isUrgent = leaf.urgent || this.activeCategory()?.urgent || false;
    this.speakPhrase(leaf.speech, isUrgent);
  }

  resetOrBack(): void {
    this.unlockAudio();
    this.triggerHaptic([50, 30, 50]); // Confirmation pulse
    if (this.activeLeaf()) {
      this.activeLeaf.set(null);
      if (this.isBrowser && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      this.announcement.set('Returned to category options.');
      return;
    }
    if (this.activeCategory()) {
      this.activeCategory.set(null);
      this.announcement.set('Returned to main triage menu.');
      return;
    }
  }

  fullReset(): void {
    this.unlockAudio();
    this.triggerHaptic([50, 30, 50]); // Confirmation pulse
    this.activeCategory.set(null);
    this.activeLeaf.set(null);
    this.alertTimestamp.set(null);
    if (this.isBrowser && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.announcement.set('Reset to Home menu.');
  }
}
