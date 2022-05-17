import { it, vi } from 'vitest';

import { sendDataRequest } from './http';

// when we call sendDataRequest, we don't want 'fetch' to be executed, we want to mock it away. in former lessons, we did the following:
// vi.mock('fs') // we pass to 'mock' the module to be replaced.
// however, the problem we have now is that 'fetch' is a globally avaialble function (not imported from any module). that's why we call another method from 'vi':
vi.stubGlobal('fetch');
// it allows us to replace globally available objects or functions with other implementations. the first argument is a string with the name of the globally available function that you want to replace, and the second argument is the replacement.

it('should return any available response data', () => {
	sendDataRequest();
});
