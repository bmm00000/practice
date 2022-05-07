// import React from 'react';
// (you don't need to import React in the latest versions)

const Todos: React.FC<{ items: string[] }> = (props) => {
	return (
		<ul>
			{props.items.map((item) => (
				<li key={item}>{item}</li>
			))}
		</ul>
	);
};

export default Todos;

// we could think about doing the following:
// function Todos(props: { items: string[] }) {
// 	return <ul>{}</ul>;
// }

// if you don't specify the type of 'props', ts will warn you that it implicitly has the type 'any', but if you explicitly specify a type (including 'any'), then the warning will disappear (you can configure how strict the conditions for warnings are, in the tsconfig.json file)

// however, since 'props' is an object that includes, not only your custom props, but also special props (ie. 'children'), and it would be cumbersome to add the type of the special props for every component, you can use a generic type that you import from React (FC, defined by the '@types/react' package; you can scroll over 'FC' press 'command' and click to see the type definition built into the react package), so you will be able to merge the type of the built-in special props, ie. 'children' (covered by the FC generic type) and the type of your custom props. therefore, when you are typying 'props' the IDE will give you the option to add 'children':
// const Todos: React.FC = (props) => {
// 	return <div>{props.children}</div>;
// };

// in the former lesson, we used <> to define a generic type. now we are not defining a generic type, but using it (FC, which internally is using <> under the hood to define this generic type). and here, when we use <>, we are not setting up a new generic type, but we are plugging in a spcecific value for that internally used generic type, ie. for the type T defined under the hood by the FC type (therefore, we are using <> differently here). therefore, we see here the other side of generic types: we are using a generic type (FC), and we also explicitly set the specific type that should be used for this usage of this generic FC type.
// by adding <> after the FC, we unlock a feature built into the FC generic type that will merge any object type (for 'props') that we define inside of the <>, with the base 'props' object type of the generic FC (ie. children property)
// now, if you don't add the expected props in the Todos component of App.tsx, then the IDE will warn you. also, if you add '?' to the props object type ({ items?: string[] }), then you won't have an error in Todos of App.tsx, but in this case you will need to handle in this file the case in which we don't have items (otherwise, the IDE will warn you in this file). this is the advantage of using ts with react: if you don't pass the props that are expected, the ide will warn you.
