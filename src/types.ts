export type AnimalCategory = 'cattle' | 'goat_sheep' | 'poultry' | 'pets';

export interface TreatmentCase {
  id: string;
  titleBn: string;
  titleEn: string;
  tagBn: string;
  tagEn: string;
  animalType: string;
  location: string;
  ownerName: string;
  criticalQuoteBn: string;
  storyBn: string;
  storyEn: string;
  initialConditionBn: string;
  initialConditionEn: string;
  treatmentStepsBn: string[];
  treatmentStepsEn: string[];
  recoveryResultBn: string;
  recoveryResultEn: string;
  timeToRecovery: string;
  isFeatured?: boolean;
  imagePrompt?: string;
  iconType: 'cow' | 'goat' | 'dog' | 'medicine';
}

export interface SymptomTriageItem {
  id: string;
  category: AnimalCategory;
  nameBn: string;
  nameEn: string;
  severity: 'critical' | 'urgent' | 'moderate';
  firstAidBn: string[];
  firstAidEn: string[];
  warningBn: string;
  warningEn: string;
}

export interface ConsultationMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  audioUrl?: string;
  timestamp: string;
  isEmergencyAlert?: boolean;
}
