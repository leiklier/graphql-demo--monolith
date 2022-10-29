import { ExpressContext } from 'apollo-server-express';
import { User } from './entity/User';

export interface ContextValue {
	user?: User | null;
}

export async function context({
	req,
	res,
}: ExpressContext): Promise<ContextValue> {
	return {};
}
