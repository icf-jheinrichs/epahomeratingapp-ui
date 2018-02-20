export function authenticationHook ($transitions, AuthenticationService, AuthorizationService) {
    'ngInject';

    // Matches if the destination state's data property has a truthy 'requiresAuth' property
    let requiresAuthCriteria = {
        to : (state) => {
            return (state.data === undefined) || state.data.requiresAuth;
        }
    };

    // Function that returns a redirect for the current transition to the login state
    // if the user is not currently authenticated (according to the AuthenticationService)

    let redirectToLogin = (transition) => {
        let $state = transition.router.stateService;

        if (!AuthenticationService.userIsAuthenticated) {
            return $state.target('login', undefined, {location : false});
        }

        if (!AuthorizationService.userIsAuthorizedForRoute(transition._targetState._identifier)) {
            return $state.target('not-authorized', undefined, {location : false});
        }
    };

    // Register the "requires auth" hook with the TransitionsService
    $transitions.onBefore(requiresAuthCriteria, redirectToLogin, {priority : 10});
}
