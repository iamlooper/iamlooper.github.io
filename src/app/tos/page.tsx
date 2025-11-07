'use client';

import { Container, Box, Typography, Paper, Divider, Chip, Fade } from '@mui/material';
import { Gavel, CalendarToday } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

export default function TermsOfServicePage() {
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
                <Gavel fontSize="large" />
              </Box>
              <Typography 
                variant="h3" 
                component="h1"
                sx={{ 
                  fontWeight: 400,
                  color: theme.vars.palette.primary.dark,
                }}
              >
                Terms of Service
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
                    1. Acceptance of Terms
                  </Typography>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    By accessing or using <a href="https://iamlooper.github.io" target="_blank" rel="noopener noreferrer" style={{ color: theme.vars.palette.primary.main }}>iamlooper.github.io</a> ("Website") or any software, applications, or services provided by Looper ("we," "our," or "us"), you agree to be bound by these Terms of Service. If you do not agree to these terms, you must not use our Website or services.
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
                    2. Eligibility
                  </Typography>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    You must be at least 13 years old or the minimum legal age in your jurisdiction to use our services. If you are under the legal age, you may only use our services under the supervision of a parent or guardian.
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
                    3. Use of Services
                  </Typography>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    You agree to use our services only for lawful purposes and in accordance with these Terms. You must not:
                  </Typography>
                  <Box component="ul" sx={{ pl: 3 }}>
                    <Typography component="li" variant="body1" sx={{ mb: 1, color: theme.vars.palette.text.secondary }}>
                      Engage in any activity that violates applicable laws or regulations.
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 1, color: theme.vars.palette.text.secondary }}>
                      Attempt to access, alter, or interfere with our systems or networks.
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 1, color: theme.vars.palette.text.secondary }}>
                      Distribute malicious code, viruses, or harmful software.
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
                    4. Accounts
                  </Typography>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    We may allow you to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
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
                    5. Content and Intellectual Property
                  </Typography>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    All content, code, trademarks, and other intellectual property on the Website are owned by or licensed to us. You may not copy, modify, distribute, sell, or lease any part of our intellectual property without prior written consent.
                    If you submit content to us, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and distribute it for the purpose of providing our services.
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
                    6. End User License Agreement (EULA) for Software
                  </Typography>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    If you download or use our software, we grant you a limited, non-exclusive, non-transferable, revocable license to use it for personal or internal business purposes, in accordance with these Terms. You may not:
                  </Typography>
                  <Box component="ul" sx={{ pl: 3 }}>
                    <Typography component="li" variant="body1" sx={{ mb: 1, color: theme.vars.palette.text.secondary }}>
                      Reverse-engineer, decompile, or disassemble the software.
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 1, color: theme.vars.palette.text.secondary }}>
                      Modify, adapt, or create derivative works based on the software.
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 1, color: theme.vars.palette.text.secondary }}>
                      Use the software for any unlawful purpose.
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
                    We reserve the right to terminate this license at any time.
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
                    7. Third-Party Services
                  </Typography>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    Our services may integrate with or link to third-party websites, services, or tools. We do not control and are not responsible for the content, privacy policies, or practices of any third-party service providers.
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
                    8. Advertisements and Promotions
                  </Typography>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    Our services may display advertisements, sponsored content, or promotional materials. Any dealings with advertisers found on our services are solely between you and the advertiser.
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
                    9. Payments and Transactions
                  </Typography>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    If you purchase software, subscriptions, or services from us, payments may be processed by third-party payment processors. We do not store your full payment card details. Your transactions are subject to the payment processor's terms and privacy policies.
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
                    10. DMCA and Copyright Complaints
                  </Typography>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    If you believe any content on our services infringes your copyright, you may submit a notice with:
                  </Typography>
                  <Box component="ul" sx={{ pl: 3 }}>
                    <Typography component="li" variant="body1" sx={{ mb: 1, color: theme.vars.palette.text.secondary }}>
                      Your contact information.
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 1, color: theme.vars.palette.text.secondary }}>
                      Identification of the copyrighted work.
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 1, color: theme.vars.palette.text.secondary }}>
                      Identification of the infringing material.
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 1, color: theme.vars.palette.text.secondary }}>
                      A statement that you have a good faith belief the use is not authorized.
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
                    Send notices to: <a href="mailto:mail.explain660@passinbox.com" style={{ color: theme.vars.palette.primary.main }}>mail.explain660@passinbox.com</a>. We may remove content in accordance with applicable law.
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
                    11. Disclaimer of Warranties
                  </Typography>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    Our services are provided "as is" and "as available" without any warranties, express or implied. We do not guarantee uninterrupted or error-free service, and your use is at your sole risk.
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
                    12. Limitation of Liability
                  </Typography>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    To the fullest extent permitted by law, we are not liable for any indirect, incidental, or consequential damages resulting from your use of our services.
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
                    13. Indemnification
                  </Typography>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    You agree to indemnify and hold harmless Looper from and against any claims, liabilities, damages, and expenses arising out of your use of our services.
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
                    14. Termination
                  </Typography>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    We may suspend or terminate your access to our services, with or without notice, for any reason or no reason, including if you violate these Terms.
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
                    15. Force Majeure
                  </Typography>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    We are not responsible for delays or failures in performance caused by events beyond our reasonable control, including but not limited to acts of God, natural disasters, war, strikes, government actions, or internet disruptions.
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
                    16. Changes to the Terms
                  </Typography>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    We may update these Terms at any time. Continued use of our services after changes constitutes acceptance of the updated Terms.
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
                    17. Severability
                  </Typography>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will remain in effect.
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
                    18. Entire Agreement
                  </Typography>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    These Terms constitute the entire agreement between you and us regarding the use of our services and supersede any prior agreements or communications.
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
                    19. Governing Law & Dispute Resolution
                  </Typography>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    These Terms shall be governed by and construed in accordance with the laws applicable in the location of the service provider, without regard to conflict of law principles. Any disputes arising out of or relating to these Terms or our services shall be resolved in a competent court or arbitration forum selected by the service provider, unless otherwise required by applicable law.
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
                    20. Contact Information
                  </Typography>
                  <Typography 
                    variant="body1" 
                    component="p"
                    sx={{ 
                      color: theme.vars.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    If you have any questions about these Terms, contact us at:<br />
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
