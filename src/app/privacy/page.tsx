'use client';

import { Container, Box, Typography, Paper, Divider, Chip, Fade } from '@mui/material';
import { Security, CalendarToday } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

export default function PrivacyPolicyPage() {
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Fade in={mounted} timeout={600}>
        <Box>
          <Paper 
            elevation={0}
            sx={{ 
              p: { xs: 3, sm: 4 }, 
              mb: 4,
              backgroundColor: theme.vars.palette.primary.light,
              border: `1px solid ${theme.vars.palette.divider}`,
              borderRadius: 3,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: '50%',
                  backgroundColor: theme.vars.palette.primary.main,
                  color: theme.vars.palette.primary.contrastText,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Security fontSize="large" />
              </Box>
              <Typography 
                variant="h3" 
                component="h1"
                sx={{ 
                  fontWeight: 400,
                  color: theme.vars.palette.primary.dark,
                }}
              >
                Privacy Policy
              </Typography>
            </Box>
            <Chip 
              icon={<CalendarToday fontSize="small" />}
              label={`Last updated: ${new Date().toLocaleDateString()}`}
              size="small"
              sx={{ 
                backgroundColor: theme.vars.palette.background.paper,
                color: theme.vars.palette.text.secondary,
              }}
            />
          </Paper>

          <Paper 
            elevation={0}
            sx={{ 
              backgroundColor: theme.vars.palette.background.paper,
              border: `1px solid ${theme.vars.palette.divider}`,
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <Box sx={{ p: { xs: 3, sm: 4 } }}>
              <Box sx={{ '& > *': { mb: 4 } }}>
                <section>
                  <Typography 
                    variant="h5" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 500,
                      color: theme.vars.palette.text.primary,
                      mb: 2,
                    }}
                  >
                    1. Introduction
                  </Typography>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                      fontSize: '1.1rem',
                      mb: 3,
                    }}
                  >
                    We respect your privacy. This Privacy Policy explains how we may collect, use, and protect your information 
                    when you use <a href="https://iamlooper.github.io" target="_blank" rel="noopener noreferrer" style={{ color: theme.vars.palette.primary.main }}>iamlooper.github.io</a> and related services. This policy is designed to comply with applicable 
                    privacy laws, including the EU General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA), where applicable.
                  </Typography>
                </section>

                <Divider sx={{ my: 3, borderColor: theme.vars.palette.divider }} />

                <section>
                  <Typography 
                    variant="h5" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 500,
                      color: theme.vars.palette.text.primary,
                      mb: 2,
                    }}
                  >
                    2. Information We May Collect
                  </Typography>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    We may collect the following types of information:
                  </Typography>
                  <Box component="ul" sx={{ pl: 3 }}>
                    <Typography component="li" variant="body1" sx={{ mb: 1, color: theme.vars.palette.text.secondary }}>
                      Personal Information: Such as your name, email address, or other identifiers you provide voluntarily (e.g., via contact forms or account creation).
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 1, color: theme.vars.palette.text.secondary }}>
                      Non-Personal Information: Such as browser type, device information, operating system, and usage data collected automatically.
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 1, color: theme.vars.palette.text.secondary }}>
                      Cookies and Tracking Technologies: We may use cookies, web beacons, analytics tools, and similar technologies to improve our services and user experience.
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    Note: In some cases, we may not collect any personal data. The absence of data collection will be indicated where applicable.
                  </Typography>
                </section>

                <Divider sx={{ my: 3, borderColor: theme.vars.palette.divider }} />

                <section>
                  <Typography 
                    variant="h5" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 500,
                      color: theme.vars.palette.text.primary,
                      mb: 2,
                    }}
                  >
                    3. Legal Basis for Processing (GDPR)
                  </Typography>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    Where GDPR applies, we may process personal data under the following legal bases:
                  </Typography>
                  <Box component="ul" sx={{ pl: 3 }}>
                    <Typography component="li" variant="body1" sx={{ mb: 1, color: theme.vars.palette.text.secondary }}>
                      Your consent.
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 1, color: theme.vars.palette.text.secondary }}>
                      Performance of a contract.
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 1, color: theme.vars.palette.text.secondary }}>
                      Compliance with legal obligations.
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 1, color: theme.vars.palette.text.secondary }}>
                      Legitimate interests pursued by us or a third party.
                    </Typography>
                  </Box>
                </section>

                <Divider sx={{ my: 3, borderColor: theme.vars.palette.divider }} />

                <section>
                  <Typography 
                    variant="h5" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 500,
                      color: theme.vars.palette.text.primary,
                      mb: 2,
                    }}
                  >
                    4. How We May Use Information
                  </Typography>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    We may use the information we collect to:
                  </Typography>
                  <Box component="ul" sx={{ pl: 3 }}>
                    <Typography component="li" variant="body1" sx={{ mb: 1, color: theme.vars.palette.text.secondary }}>
                      Provide, maintain, and improve our services.
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 1, color: theme.vars.palette.text.secondary }}>
                      Communicate with you, including responding to inquiries.
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 1, color: theme.vars.palette.text.secondary }}>
                      Personalize your experience.
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 1, color: theme.vars.palette.text.secondary }}>
                      Display advertisements and sponsored content (if applicable).
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 1, color: theme.vars.palette.text.secondary }}>
                      Analyze service performance and user behavior.
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 1, color: theme.vars.palette.text.secondary }}>
                      Comply with legal obligations.
                    </Typography>
                  </Box>
                </section>

                <Divider sx={{ my: 3, borderColor: theme.vars.palette.divider }} />

                <section>
                  <Typography 
                    variant="h5" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 500,
                      color: theme.vars.palette.text.primary,
                      mb: 2,
                    }}
                  >
                    5. Sharing of Information
                  </Typography>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    We may share information:
                  </Typography>
                  <Box component="ul" sx={{ pl: 3 }}>
                    <Typography component="li" variant="body1" sx={{ mb: 1, color: theme.vars.palette.text.secondary }}>
                      With service providers who assist us in operating our services.
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 1, color: theme.vars.palette.text.secondary }}>
                      With analytics, advertising, or marketing partners (if applicable).
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 1, color: theme.vars.palette.text.secondary }}>
                      If required by law, court order, or governmental authority.
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 1, color: theme.vars.palette.text.secondary }}>
                      To protect our legal rights, users, and the public.
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    We do not sell personal information to third parties.
                  </Typography>
                </section>

                <Divider sx={{ my: 3, borderColor: theme.vars.palette.divider }} />

                <section>
                  <Typography 
                    variant="h5" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 500,
                      color: theme.vars.palette.text.primary,
                      mb: 2,
                    }}
                  >
                    6. Your Privacy Rights
                  </Typography>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    Depending on your location, you may have the right to:
                  </Typography>
                  <Box component="ul" sx={{ pl: 3 }}>
                    <Typography component="li" variant="body1" sx={{ mb: 1, color: theme.vars.palette.text.secondary }}>
                      Access, update, or delete your personal information.
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 1, color: theme.vars.palette.text.secondary }}>
                      Object to or restrict certain types of data processing.
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 1, color: theme.vars.palette.text.secondary }}>
                      Withdraw consent where we rely on your consent.
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 1, color: theme.vars.palette.text.secondary }}>
                      Request a copy of your data in a portable format.
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    To exercise these rights, contact us at <a href="mailto:mail.explain660@passinbox.com" style={{ color: theme.vars.palette.primary.main }}>mail.explain660@passinbox.com</a>.
                  </Typography>
                </section>

                <Divider sx={{ my: 3, borderColor: theme.vars.palette.divider }} />

                <section>
                  <Typography 
                    variant="h5" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 500,
                      color: theme.vars.palette.text.primary,
                      mb: 2,
                    }}
                  >
                    7. Cookie Consent and Do Not Track
                  </Typography>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    We may use cookies or similar tracking technologies. You may adjust your browser settings to refuse cookies, though some service features may not function properly. We currently do not respond to "Do Not Track" (DNT) signals from browsers.
                  </Typography>
                </section>

                <Divider sx={{ my: 3, borderColor: theme.vars.palette.divider }} />

                <section>
                  <Typography 
                    variant="h5" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 500,
                      color: theme.vars.palette.text.primary,
                      mb: 2,
                    }}
                  >
                    8. Data Retention
                  </Typography>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    We may retain your information for as long as necessary to provide services, comply with legal obligations, or resolve disputes. If no longer needed, we will securely delete or anonymize it.
                  </Typography>
                </section>

                <Divider sx={{ my: 3, borderColor: theme.vars.palette.divider }} />

                <section>
                  <Typography 
                    variant="h5" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 500,
                      color: theme.vars.palette.text.primary,
                      mb: 2,
                    }}
                  >
                    9. International Data Transfers
                  </Typography>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    Your information may be transferred and processed in countries other than your own. By using our services, you consent to such transfers, subject to applicable legal protections.
                  </Typography>
                </section>

                <Divider sx={{ my: 3, borderColor: theme.vars.palette.divider }} />

                <section>
                  <Typography 
                    variant="h5" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 500,
                      color: theme.vars.palette.text.primary,
                      mb: 2,
                    }}
                  >
                    10. Third-Party Services
                  </Typography>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    Our services may contain links to third-party websites or use third-party tools, such as analytics or advertising platforms. We are not responsible for the privacy practices of these third parties.
                  </Typography>
                </section>

                <Divider sx={{ my: 3, borderColor: theme.vars.palette.divider }} />

                <section>
                  <Typography 
                    variant="h5" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 500,
                      color: theme.vars.palette.text.primary,
                      mb: 2,
                    }}
                  >
                    11. Data Security
                  </Typography>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    We take reasonable measures to protect your information, but no method of transmission or storage is 100% secure.
                  </Typography>
                </section>

                <Divider sx={{ my: 3, borderColor: theme.vars.palette.divider }} />

                <section>
                  <Typography 
                    variant="h5" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 500,
                      color: theme.vars.palette.text.primary,
                      mb: 2,
                    }}
                  >
                    12. Children's Privacy
                  </Typography>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    Our services are not directed at children under the age of 13 (or the minimum age in your jurisdiction). We do not knowingly collect personal information from children.
                  </Typography>
                </section>

                <Divider sx={{ my: 3, borderColor: theme.vars.palette.divider }} />

                <section>
                  <Typography 
                    variant="h5" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 500,
                      color: theme.vars.palette.text.primary,
                      mb: 2,
                    }}
                  >
                    13. Complaint Rights
                  </Typography>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    If you are located in the European Economic Area, you have the right to lodge a complaint with your local data protection authority if you believe we have not complied with applicable data protection laws.
                  </Typography>
                </section>

                <Divider sx={{ my: 3, borderColor: theme.vars.palette.divider }} />

                <section>
                  <Typography 
                    variant="h5" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 500,
                      color: theme.vars.palette.text.primary,
                      mb: 2,
                    }}
                  >
                    14. Changes to This Policy
                  </Typography>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    We may update this Privacy Policy at any time. Changes will be posted on this page with the updated date.
                  </Typography>
                </section>

                <Divider sx={{ my: 3, borderColor: theme.vars.palette.divider }} />

                <section>
                  <Typography 
                    variant="h5" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 500,
                      color: theme.vars.palette.text.primary,
                      mb: 2,
                    }}
                  >
                    15. Governing Law & Dispute Resolution
                  </Typography>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    This Privacy Policy shall be governed by and construed in accordance with the laws applicable in the location of the service provider, without regard to conflict of law principles. Any disputes arising out of or relating to this Policy or our services shall be resolved in a competent court or arbitration forum selected by the service provider, unless otherwise required by applicable law.
                  </Typography>
                </section>

                <Divider sx={{ my: 3, borderColor: theme.vars.palette.divider }} />

                <section>
                  <Typography 
                    variant="h5" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 500,
                      color: theme.vars.palette.text.primary,
                      mb: 2,
                    }}
                  >
                    16. Contact Information
                  </Typography>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    If you have questions or concerns about this Privacy Policy, contact us at:<br />
                    Email: <a href="mailto:mail.explain660@passinbox.com" style={{ color: theme.vars.palette.primary.main }}>mail.explain660@passinbox.com</a>
                  </Typography>
                </section>
              </Box>
            </Box>
          </Paper>

        </Box>
      </Fade>
    </Container>
  );
}
