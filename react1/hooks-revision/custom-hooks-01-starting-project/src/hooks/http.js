const useHttp = () => {};

export default useHttp;

// the cool thing about custom hooks is that, any component that uses, for example, this custom hook, will run the hook as if it had the code that we have written in here directly in the component (it's not like you have one function shared by multiple components, and then they run the same code with the same data): each functional component gets its own shapshot of this hook so to speak. therefore, the stateful logic that you have in the custom hook will be different for each component where you use the hook, so you can share the logic, not the data. that's the idea behind hooks.
