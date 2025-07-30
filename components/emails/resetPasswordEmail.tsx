import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';

interface PasswordResetEmailProps {
    userName: string;
    resetUrl: string;
    requestTime: string;
}

const PasswordResetEmail = ({userName, resetUrl, requestTime}: PasswordResetEmailProps) => {

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Reset your password - secure link inside</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] px-[32px] py-[40px] mx-auto max-w-[600px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-[24px] font-bold text-gray-900 m-0 mb-[8px]">
                Password Reset Request
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                We received a request to reset your password
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-800 mb-[16px] m-0">
                Hi {userName},
              </Text>
              <Text className="text-[16px] text-gray-800 mb-[16px] m-0">
                    We recieved a request to reset your password {requestTime}. If this was you, click the button below to reset your password.
              </Text>
              <Text className="text-[16px] text-gray-800 mb-[24px] m-0">
                If you didn't request this password reset, you can safely ignore this email. Your password will remain unchanged.
              </Text>
            </Section>

            {/* CTA Button */}
            <Section className="text-center mb-[32px]">
              <Button
                href={resetUrl}
                className="bg-red-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border"
              >
                Reset My Password
              </Button>
            </Section>

            {/* Alternative Link */}
            <Section className="mb-[32px]">
              <Text className="text-[14px] text-gray-600 mb-[8px] m-0">
                If the button doesn't work, copy and paste this link into your browser:
              </Text>
              <Link
                href={resetUrl}
                className="text-red-600 text-[14px] break-all"
              >
                {resetUrl}
              </Link>
            </Section>

            {/* Security Information */}
            <Section className="bg-yellow-50 border border-solid border-yellow-200 rounded-[8px] p-[20px] mb-[32px]">
              <Text className="text-[14px] text-yellow-800 mb-[12px] m-0">
                <strong>🔒 Security Information:</strong>
              </Text>
              <Text className="text-[14px] text-yellow-800 mb-[8px] m-0">
                • This reset link will expire in 1 hour for your security
              </Text>
              <Text className="text-[14px] text-yellow-800 mb-[8px] m-0">
                • The link can only be used once
              </Text>
              <Text className="text-[14px] text-yellow-800 mb-[8px] m-0">
                • If you didn't request this, please check your account security
              </Text>
              <Text className="text-[14px] text-yellow-800 m-0">
                • Never share this reset link with anyone
              </Text>
            </Section>

            {/* Additional Help */}
            <Section className="mb-[32px]">
              <Text className="text-[14px] text-gray-600 mb-[8px] m-0">
                <strong>Need help?</strong>
              </Text>
              <Text className="text-[14px] text-gray-600 mb-[8px] m-0">
                If you're having trouble resetting your password or suspect unauthorized access to your account, please contact our support team immediately.
              </Text>
              <Text className="text-[14px] text-gray-600 m-0">
                <Link href="mailto:support@example.com" className="text-blue-600">
                  support@example.com
                </Link>
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-solid border-gray-200 pt-[24px]">
              <Text className="text-[12px] text-gray-500 text-center m-0 mb-[8px]">
                This email was sent to {userName}
              </Text>
              <Text className="text-[12px] text-gray-500 text-center m-0 mb-[8px]">
                Request made on {new Date().toLocaleDateString('en-GB')} at {new Date().toLocaleTimeString('en-GB')}
              </Text>
              <Text className="text-[12px] text-gray-500 text-center m-0 mb-[8px]">
                © 2025 Your Company Name. All rights reserved.
              </Text>
              <Text className="text-[12px] text-gray-500 text-center m-0 mb-[8px]">
                123 Business Street, London, UK SW1A 1AA
              </Text>
              <Text className="text-[12px] text-gray-500 text-center m-0">
                <Link href="#" className="text-gray-500 no-underline">
                  Unsubscribe
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default PasswordResetEmail