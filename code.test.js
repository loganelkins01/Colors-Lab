/**
 * @jest-environment jsdom
 */

const { buildAddColorPayload, doLogin } = require('./js/code');

describe("buildAddColorPayload Unit Test", () => {
    test("Test valid parameters, expect JSON payload", () => {
        expect(buildAddColorPayload("blue", 1))
        .toBe("{\"color\":\"blue\",\"userId\":1}");
    });
});

describe("Login API Integration Test", () => {
    // Setup
    let mockXHR;
    beforeEach(() => {
        document.body.innerHTML = `
        <input id="loginName" value="testUser" />
        <input id="loginPassword" value="testPass" />
        <div id="loginResult"></div>
        `;
    
        // Mock XMLHttpRequest
        mockXHR = {
            open: jest.fn(),
            setRequestHeader: jest.fn(),
            send: jest.fn(),
            readyState: 0,
            status: 0,
            responseText: "",
            onreadystatechange: null
        };

        global.XMLHttpRequest = jest.fn(() => {
            return mockXHR;
        });

        // Mock window.location
        delete window.location;
        window.location = {
            set href(value) {
                this._href = value;
            },
            get href() {
                return this._href;
            }
        };
    });

    test("Test successful login, expects cookie to log user info and empty error message", () => {
        const fakeResponse = JSON.stringify({
            id: 5,
            firstName: "John",
            lastName: "Doe"
        });

        doLogin();

        mockXHR.readyState = 4;
        mockXHR.status = 200;
        mockXHR.responseText = fakeResponse;

        mockXHR.onreadystatechange.call(mockXHR);

        // Check cookie contains user info
        expect(document.cookie).toContain("firstName=John");
        expect(document.cookie).toContain("lastName=Doe");
        expect(document.cookie).toContain("userId=5");

        // Check no error message
        const result = document.getElementById("loginResult").innerHTML;
        expect(result).toBe("");
    });

    test("Test failed login, expects error message", () => {
        const fakeResponse = JSON.stringify({
            id: 0
        });

        doLogin();

        mockXHR.readyState = 4;
        mockXHR.status = 200;
        mockXHR.responseText = fakeResponse;

        mockXHR.onreadystatechange();

        const result = document.getElementById("loginResult").innerHTML;
        expect(result).toBe("User/Password combination incorrect");
    });
});