Meteor.startup(function () {
	//add admin user
	if (!Meteor.users.findOne({roles: {$in: ['admin']}})) {
		var listDefaultAdmin = [{
			username: "admin",
			email: "admin@gmail.com",
			profile: {
				firstName: 'Kien',
				lastName: 'Dang Trung'
			},
			roles: ['admin', 'creator']
		}, {
			username: 'kiendt',
			email: 'kiendt@gmail.com',
			profile: {
				firstName: 'Supervisor Kelvin',
				lastName: 'Dang'
			},
			roles: ['creator']
		}];
		_.each(listDefaultAdmin, function (adminUser) {
			var id = Accounts.createUser({
				username: adminUser.username,
				email: adminUser.email,
				profile: adminUser.profile,
				password: '123456',
				createdAt: Date.now()
			});
			if (adminUser.roles.length > 0) {
				Roles.addUsersToRoles(id, adminUser.roles);
			}
		});
	}
});