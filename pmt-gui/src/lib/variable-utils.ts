// Utility functions for updating variables in the VM
// TODO (VM#1145) these should be moved to top-level VM API

type VMTarget = {
    id?: string;
    variables: Record<string, {value: unknown}>;
    setVariableValue: (variableId: string, value: unknown) => void;
};

type VMLike = {
    runtime: {
        getTargetById: (id: string) => VMTarget;
        getTargetForStage: () => VMTarget;
    };
};

const getTarget = (vm: VMLike, targetId?: string): VMTarget => {
    const target = targetId ?
        vm.runtime.getTargetById(targetId) :
        vm.runtime.getTargetForStage();
    return target;
};

const getVariable = (vm: VMLike, targetId: string | undefined, variableId: string): {value: unknown} => {
    const target = getTarget(vm, targetId);
    return target.variables[variableId];
};

const getVariableValue = (vm: VMLike, targetId: string | undefined, variableId: string): unknown => {
    const variable = getVariable(vm, targetId, variableId);
    // If array, return a new copy for mutating, ensuring that updates stay immutable.
    if (Array.isArray(variable.value)) return variable.value.slice();
    return variable.value;
};

const setVariableValue = (vm: VMLike, targetId: string | undefined, variableId: string, value: unknown): void => {
    const target = getTarget(vm, targetId);
    target.setVariableValue(variableId, value);
};

export {
    getVariable,
    getVariableValue,
    setVariableValue
};
