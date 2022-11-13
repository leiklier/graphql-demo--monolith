import { IsEmail, MinLength } from 'class-validator';
import { ArgsType, Field, ObjectType, registerEnumType } from 'type-graphql';

export enum AuthRole {
	User = 'USER',
	Admin = 'ADMIN',
}

registerEnumType(AuthRole, {
	name: 'AuthRole',
	description: 'Roles for managing User privileges',
});

@ArgsType()
export class LoginArgs {
	@Field()
	@IsEmail()
	email: string;

	@Field()
	@MinLength(8)
	password: string;
}

@ObjectType({
	description: 'The returned payload for executing the `login` Query',
})
export class LoginPayload {
	@Field()
	token: string;
}
