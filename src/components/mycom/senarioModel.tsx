import { create } from 'zustand';

interface SenarioStore {
  isChoosedSenario: boolean;
  ChooseSenario: () => void;
  RemoveSenario: () => void;
}

const useSenarioStore = create<SenarioStore>(set => ({
  isChoosedSenario: false,
  ChooseSenario: () => set({ isChoosedSenario: true }),
  RemoveSenario: () => set({ isChoosedSenario: false }),
}));

export default useSenarioStore;
