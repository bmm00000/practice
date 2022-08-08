function addAtBeginning<T>(arr: T[], value: T): T[] {
	return [value, ...arr];
}

const result = addAtBeginning([1, 2], 0);
